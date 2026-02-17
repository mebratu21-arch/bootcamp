"""
Exercise 5: Question Answering with Hugging Face Model
=======================================================
This script combines document retrieval with LLM-based question answering.
"""

import json
from pathlib import Path
import chromadb
import pandas as pd
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
import torch

def load_subset():
    """Load the subset created in Exercise 1."""
    subset_path = Path("cache/pdf_subset.csv")
    
    if not subset_path.exists():
        raise FileNotFoundError(
            f"Subset file not found. Please run exercise_1_data_loading.py first."
        )
    
    pdf_subset = pd.read_csv(subset_path)
    return pdf_subset

def setup_chromadb_collection(pdf_subset, n_docs=100):
    """
    Set up ChromaDB collection with documents.
    
    Args:
        pdf_subset (pd.DataFrame): News data
        n_docs (int): Number of documents to add
    
    Returns:
        chromadb.Collection: Initialized collection
    """
    print("\n🗄️  Setting up ChromaDB collection...")
    
    # Initialize client
    chroma_client = chromadb.Client()
    
    collection_name = "my_news"
    
    # Delete existing collection if it exists
    existing = chroma_client.list_collections()
    if existing and collection_name in [col.name for col in existing]:
        chroma_client.delete_collection(name=collection_name)
    
    # Create collection
    collection = chroma_client.create_collection(name=collection_name)
    
    # Add documents
    print(f"📥 Adding {n_docs} documents...")
    collection.add(
        documents=pdf_subset["title"][:n_docs].tolist(),
        metadatas=[{"topic": topic} for topic in pdf_subset["topic"][:n_docs].tolist()],
        ids=[f"id_{i}" for i in range(n_docs)]
    )
    
    print(f"✅ Collection ready with {collection.count()} documents")
    
    return collection

def initialize_llm_model(model_id="gpt2"):
    """
    Initialize Hugging Face language model for text generation.
    
    Args:
        model_id (str): Model identifier from Hugging Face
    
    Returns:
        tuple: (tokenizer, model, pipeline)
    """
    print(f"\n🤖 Initializing language model: {model_id}")
    print("⏳ This may take a moment (downloading model if needed)...")
    
    # Load tokenizer
    tokenizer = AutoTokenizer.from_pretrained(model_id)
    
    # Load model
    lm_model = AutoModelForCausalLM.from_pretrained(model_id)
    
    # Set pad token if not set
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token
    
    # Create text generation pipeline
    device = 0 if torch.cuda.is_available() else -1
    pipe = pipeline(
        "text-generation",
        model=lm_model,
        tokenizer=tokenizer,
        max_new_tokens=256,
        device=device,
        pad_token_id=tokenizer.eos_token_id
    )
    
    print(f"✅ Model loaded successfully!")
    print(f"   Device: {'GPU' if device == 0 else 'CPU'}")
    print(f"   Max tokens: 256")
    
    return tokenizer, lm_model, pipe

def retrieve_context(collection, question, n_results=5):
    """
    Retrieve relevant documents from ChromaDB based on question.
    
    Args:
        collection: ChromaDB collection
        question (str): User's question
        n_results (int): Number of documents to retrieve
    
    Returns:
        dict: Query results
    """
    print(f"\n🔍 Retrieving relevant context for: '{question}'")
    
    results = collection.query(
        query_texts=[question],
        n_results=n_results
    )
    
    print(f"✅ Retrieved {len(results['documents'][0])} relevant documents")
    
    return results

def construct_prompt(question, results):
    """
    Construct prompt with context and question for the LLM.
    
    Args:
        question (str): User's question
        results (dict): ChromaDB query results
    
    Returns:
        str: Formatted prompt
    """
    # Extract documents from results
    documents = results["documents"][0]
    
    # Concatenate context
    context = " ".join([f"#{i+1}: {doc}" for i, doc in enumerate(documents)])
    
    # Create prompt template
    prompt = f"""Relevant context from news articles:
{context}

Based on the context above, answer the following question:
Question: {question}

Answer:"""
    
    return prompt

def generate_answer(pipe, prompt):
    """
    Generate answer using the LLM pipeline.
    
    Args:
        pipe: Hugging Face text generation pipeline
        prompt (str): Formatted prompt
    
    Returns:
        str: Generated answer
    """
    print("\n🧠 Generating answer...")
    
    lm_response = pipe(
        prompt,
        do_sample=True,
        temperature=0.7,
        top_p=0.9,
        num_return_sequences=1
    )
    
    generated_text = lm_response[0]["generated_text"]
    
    print("✅ Answer generated!")
    
    return generated_text

def q_and_a(question, collection, pipe, n_context=5):
    """
    Complete Q&A pipeline: retrieve context and generate answer.
    
    Args:
        question (str): User's question
        collection: ChromaDB collection
        pipe: Hugging Face pipeline
        n_context (int): Number of context documents to retrieve
    
    Returns:
        tuple: (prompt, generated_text, results)
    """
    print("\n" + "="*60)
    print(f"❓ QUESTION: {question}")
    print("="*60)
    
    # Retrieve relevant context
    results = retrieve_context(collection, question, n_results=n_context)
    
    # Display retrieved documents
    print("\n📚 Retrieved Context Documents:")
    for i, doc in enumerate(results["documents"][0], 1):
        print(f"  {i}. {doc}")
    
    # Construct prompt
    prompt = construct_prompt(question, results)
    
    print("\n📝 Constructed Prompt:")
    print("─"*60)
    print(prompt)
    print("─"*60)
    
    # Generate answer
    generated_text = generate_answer(pipe, prompt)
    
    print("\n💡 GENERATED RESPONSE:")
    print("="*60)
    print(generated_text)
    print("="*60)
    
    return prompt, generated_text, results

def test_multiple_questions(collection, pipe):
    """
    Test Q&A system with multiple questions.
    
    Args:
        collection: ChromaDB collection
        pipe: Hugging Face pipeline
    """
    print("\n" + "="*60)
    print("🧪 TESTING MULTIPLE QUESTIONS")
    print("="*60)
    
    test_questions = [
        "What's the latest news on space development?",
        "Tell me about climate and environment issues",
        "What are the recent technology advancements?",
    ]
    
    for question in test_questions:
        q_and_a(question, collection, pipe, n_context=3)
        print("\n" + "─"*60 + "\n")

def main():
    """Main execution function."""
    print("\n" + "="*60)
    print("🚀 EXERCISE 5: QUESTION ANSWERING WITH HUGGING FACE")
    print("="*60)
    
    # Step 1: Load subset
    print("\n📂 Loading data...")
    pdf_subset = load_subset()
    print(f"✅ Loaded {len(pdf_subset)} documents")
    
    # Step 2: Set up ChromaDB collection  
    collection = setup_chromadb_collection(pdf_subset, n_docs=100)
    
    # Step 3: Initialize LLM
    tokenizer, lm_model, pipe = initialize_llm_model("gpt2")
    
    # Step 4: Run Q&A example
    question = "What's the latest news on space development?"
    prompt, generated_text, results = q_and_a(question, collection, pipe, n_context=5)
    
    # Step 5: Test multiple questions
    test_multiple_questions(collection, pipe)
    
    print("\n" + "="*60)
    print("✅ EXERCISE 5 COMPLETED SUCCESSFULLY!")
    print("="*60)
    print(f"\n📦 Summary:")
    print(f"  - LLM Model: GPT-2")
    print(f"  - Context documents per query: 5")
    print(f"  - Q&A pipeline fully functional")
    
    return collection, pipe, tokenizer, lm_model

if __name__ == "__main__":
    collection, pipe, tokenizer, model = main()
    
    print("\n" + "="*60)
    print("🎯 INTERACTIVE Q&A MODE")
    print("="*60)
    print("You can now ask questions!")
    print("Example: q_and_a('your question', collection, pipe)")
