import os
import torch
import pandas as pd
from typing import List, Dict, Any
from pinecone import Pinecone
from transformers import AutoTokenizer, AutoModel
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def get_embedding(input_question: str) -> List[float]:
    """
    Converts a text string into a 384-dimensional embedding vector.
    Using 'sentence-transformers/all-MiniLM-L6-v2'.
    """
    model_name = 'sentence-transformers/all-MiniLM-L6-v2'
    
    # Senior Dev Note: In a production environment, you'd load the model once
    # outside the function to avoid redundant overhead.
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModel.from_pretrained(model_name)
    
    encoded_input = tokenizer(input_question, padding=True, truncation=True, return_tensors='pt')
    
    with torch.no_grad():
        model_output = model(**encoded_input)
        # Sequence averaging (Dimension 1 is the sequence length)
        embedding = model_output.last_hidden_state[0].mean(dim=0)
    
    return embedding.tolist()

def run_medical_rag_pipeline() -> None:
    """
    Executes Part 4, 5, and 6 of the challenge: Semantic search followed by Reranking.
    """
    # 1. Initialization
    api_key = os.environ.get("PINECONE_API_KEY")
    index_name = 'medical-notes-index'
    if not api_key:
        print("❌ Error: PINECONE_API_KEY not found.")
        return

    pc = Pinecone(api_key=api_key)
    index = pc.Index(name=index_name)

    # 2. Semantic Search (Part 5)
    question = "What treatment is recommended for a patient with severe chest pain?"
    print(f"\n❓ Question: '{question}'")
    
    print("🧠 Generating embedding...")
    query_vector = get_embedding(question)

    print("🔍 Performing Semantic Search (top_k=5)...")
    results = index.query(
        vector=query_vector, 
        top_k=5, 
        include_metadata=True
    )

    # Sort results by score in descending order
    sorted_matches = sorted(results['matches'], key=lambda x: x['score'], reverse=True)
    
    print("\n📜 Initial Semantic Search Results:")
    show_results(question, sorted_matches)

    # 3. Reranking (Part 6)
    print("\n🚀 Preparing documents for Pinecone Reranking...")
    
    # Construct 'reranking_field' from metadata keys/values
    transformed_documents = [
        {
            'id': match['id'],
            'reranking_field': '; '.join([f"{key}: {value}" for key, value in match['metadata'].items()])
        }
        for match in sorted_matches
    ]

    # Refined query for reranking
    refined_query = "Detailed clinical protocol and emergency treatment for acute chest pain and cardiac distress"
    print(f"🎯 Refined Query: '{refined_query}'")

    try:
        print("⚡ Executing Serverless Rerank (top_n=3)...")
        reranked_results = pc.inference.rerank(
            model="bge-reranker-v2-m3",
            query=refined_query,
            documents=transformed_documents,
            rank_fields=["reranking_field"],
            top_n=3,
            return_documents=True,
        )

        show_reranked_results(refined_query, reranked_results.data)

    except Exception as e:
        print(f"❌ Reranking step failed: {e}")

def show_results(question: str, matches: List[Dict]) -> None:
    """Displays original search matches."""
    for i, match in enumerate(matches):
        print(f"{i+1:2}. ID: {match['id']} | Score: {match['score']:.4f}")
        # Assuming 'text' or similar key in metadata as per sample data
        metadata_str = str(match['metadata'])[:100] + "..."
        print(f"    Metadata: {metadata_str}")

def show_reranked_results(question: str, matches: List[Any]) -> None:
    """Displays reranked results."""
    print(f"\n💎 Reranked Results (Improved Relevance):")
    print("-" * 50)
    for i, m in enumerate(matches):
        print(f"{i+1:2}. ID: {m.document.id} | Score: {m.score:.4f}")
        print(f"    Clinical Context: {m.document.reranking_field}")
        print("-" * 30)

if __name__ == "__main__":
    run_medical_rag_pipeline()
    
    # Optional cleanup (commented out by default)
    # pc = Pinecone(api_key=os.environ.get("PINECONE_API_KEY"))
    # pc.delete_index('medical-notes-index')
