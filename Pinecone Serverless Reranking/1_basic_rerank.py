import os
from typing import List, Dict
from pinecone import Pinecone, RerankModel
from dotenv import load_dotenv

# Load environment variables if .env exists
load_dotenv()

def run_basic_reranking() -> None:
    """
    Demonstrates basic reranking using Pinecone's inference engine.
    Distinguishes between 'Apple' the company and 'apple' the fruit.
    """
    # 1. Setup API Key
    api_key = os.environ.get("PINECONE_API_KEY")
    if not api_key:
        print("❌ Error: PINECONE_API_KEY not found in environment.")
        print("Please set your API key using: $env:PINECONE_API_KEY='your-key-here'")
        return

    # 2. Instantiate Client
    try:
        pc = Pinecone(api_key=api_key)
        print("✅ Pinecone client instantiated successfully.")
    except Exception as e:
        print(f"❌ Failed to initialize Pinecone: {e}")
        return

    # 3. Define Query & Documents
    query = "Tell me about Apple's products"
    
    # MIX: Context of Apple (Tech Company) vs apple (Fruit)
    documents = [
        "The Fuji apple is a large apple with a dull red skin, known for its sweet flavor.",
        "Apple's flagship product, the iPhone, revolutionized the smartphone industry since 2007.",
        "Apples are high in fiber and Vitamin C, making them a very healthy snack option.",
        "The MacBook Pro is a line of portable Macintosh computers designed by Apple Inc.",
        "Granny Smith apples are tip-bearing, with a hard, light green skin and crisp, juicy flesh."
    ]

    print(f"\n🔍 Query: '{query}'")
    print("-" * 50)
    print("Initial list containing mixed fruit and tech documents...")

    # 4. Call the Reranker
    try:
        print("\n🚀 Executing Rerank (model: bge-reranker-v2-m3)...")
        # top_n=3 as per instructions
        reranked = pc.inference.rerank(
            model="bge-reranker-v2-m3",
            query=query,
            documents=[{"id": str(i), "text": doc} for i, doc in enumerate(documents)],
            top_n=3
        )
        
        # 5. Display Results
        show_reranked_results(query, reranked.data)
        
    except Exception as e:
        print(f"❌ Reranking failed: {e}")

def show_reranked_results(query: str, matches: List) -> None:
    """
    Prints reranked results with scores.
    """
    print(f"\n🏆 Top {len(matches)} Reranked Results:")
    print("-" * 50)
    
    for i, m in enumerate(matches):
        rank = i + 1
        score = m.score
        text = m.document.text
        print(f"Rank {rank} | Score: {score:.4f}")
        print(f"Text: {text}")
        print("-" * 30)

if __name__ == "__main__":
    run_basic_reranking()
