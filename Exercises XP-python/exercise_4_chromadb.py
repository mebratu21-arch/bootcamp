"""
Exercise 4: ChromaDB Collection and Querying
=============================================
This script demonstrates using ChromaDB for vector storage and querying.
"""

import pandas as pd
import json
from pathlib import Path
import chromadb
from chromadb.config import Settings

def load_subset():
    """Load the subset created in Exercise 1."""
    subset_path = Path("cache/pdf_subset.csv")
    
    if not subset_path.exists():
        raise FileNotFoundError(
            f"Subset file not found at {subset_path}. "
            "Please run exercise_1_data_loading.py first."
        )
    
    print(f"📂 Loading subset from: {subset_path}")
    pdf_subset = pd.read_csv(subset_path)
    print(f"✅ Loaded {len(pdf_subset)} rows")
    
    return pdf_subset

def initialize_chromadb(collection_name="my_news"):
    """
    Initialize ChromaDB client and create collection.
    
    Args:
        collection_name (str): Name of the collection
    
    Returns:
        tuple: (client, collection)
    """
    print(f"\n🗄️  Initializing ChromaDB...")
    
    # Initialize client
    chroma_client = chromadb.Client()
    
    # Check if collection exists and delete it
    existing_collections = chroma_client.list_collections()
    if existing_collections and collection_name in [col.name for col in existing_collections]:
        print(f"⚠️  Collection '{collection_name}' exists. Deleting...")
        chroma_client.delete_collection(name=collection_name)
    
    # Create new collection
    print(f"✨ Creating collection: '{collection_name}'")
    collection = chroma_client.create_collection(name=collection_name)
    
    print(f"✅ Collection created successfully!")
    
    return chroma_client, collection

def add_data_to_collection(collection, pdf_subset, n=100):
    """
    Add data to ChromaDB collection.
    
    Args:
        collection: ChromaDB collection
        pdf_subset (pd.DataFrame): News data subset
        n (int): Number of documents to add
    
    Returns:
        int: Number of documents added
    """
    print(f"\n📥 Adding {n} documents to collection...")
    print("⏳ This may take a moment (embedding generation happens automatically)...")
    
    # Prepare data
    documents = pdf_subset["title"][:n].tolist()
    metadatas = [{"topic": topic} for topic in pdf_subset["topic"][:n].tolist()]
    ids = [f"id_{i}" for i in range(n)]
    
    print(f"\n📊 Data preview:")
    print(f"  - Total documents: {len(documents)}")
    print(f"  - Sample document: {documents[0][:60]}...")
    print(f"  - Sample metadata: {metadatas[0]}")
    print(f"  - Sample ID: {ids[0]}")
    
    # Add to collection
    collection.add(
        documents=documents,
        metadatas=metadatas,
        ids=ids
    )
    
    print(f"✅ Added {n} documents to collection!")
    print(f"   Collection now contains: {collection.count()} documents")
    
    return n

def query_collection(collection, query_text, n_results=10):
    """
    Query the ChromaDB collection.
    
    Args:
        collection: ChromaDB collection
        query_text (str): Search query
        n_results (int): Number of results to return
    
    Returns:
        dict: Query results
    """
    print(f"\n🔍 Querying collection...")
    print(f"   Query: '{query_text}'")
    print(f"   Requesting top {n_results} results")
    
    results = collection.query(
        query_texts=[query_text],
        n_results=n_results
    )
    
    print(f"✅ Retrieved {len(results['documents'][0])} results")
    
    return results

def display_results(results, query_text):
    """
    Display query results in a formatted way.
    
    Args:
        results (dict): ChromaDB query results
        query_text (str): Original query
    """
    print("\n" + "="*60)
    print(f"📋 SEARCH RESULTS FOR: '{query_text}'")
    print("="*60)
    
    documents = results['documents'][0]
    metadatas = results['metadatas'][0]
    distances = results['distances'][0]
    ids = results['ids'][0]
    
    for i, (doc, meta, dist, doc_id) in enumerate(zip(documents, metadatas, distances, ids), 1):
        print(f"\n{i}. 📰 {doc}")
        print(f"   ID: {doc_id}")
        print(f"   Topic: {meta['topic']}")
        print(f"   Distance: {dist:.4f}")
    
    # Pretty print full JSON
    print("\n" + "="*60)
    print("📄 FULL JSON RESPONSE")
    print("="*60)
    print(json.dumps(results, indent=2))

def test_multiple_queries(collection):
    """
    Test collection with multiple different queries.
    
    Args:
        collection: ChromaDB collection
    """
    print("\n" + "="*60)
    print("🧪 TESTING MULTIPLE QUERIES")
    print("="*60)
    
    test_queries = [
        ("space", 5),
        ("environment climate", 5),
        ("technology AI machine learning", 5),
        ("business economy", 5)
    ]
    
    for query, n_results in test_queries:
        print("\n" + "─"*60)
        results = query_collection(collection, query, n_results)
        display_results(results, query)

def main():
    """Main execution function."""
    print("\n" + "="*60)
    print("🚀 EXERCISE 4: CHROMADB COLLECTION AND QUERYING")
    print("="*60)
    
    # Step 1: Load subset
    pdf_subset = load_subset()
    
    # Display subset info
    print(f"\n📊 Dataset overview:")
    print(pdf_subset.head())
    
    # Step 2: Initialize ChromaDB
    chroma_client, collection = initialize_chromadb("my_news")
    
    # Step 3: Add data to collection
    n_added = add_data_to_collection(collection, pdf_subset, n=100)
    
    # Step 4: Query the collection
    query_text = "space"
    results = query_collection(collection, query_text, n_results=10)
    
    # Step 5: Display results
    display_results(results, query_text)
    
    # Step 6: Test multiple queries
    test_multiple_queries(collection)
    
    print("\n" + "="*60)
    print("✅ EXERCISE 4 COMPLETED SUCCESSFULLY!")
    print("="*60)
    print(f"\n📦 Outputs:")
    print(f"  - ChromaDB collection created: 'my_news'")
    print(f"  - Documents added: {n_added}")
    print(f"  - Queries tested successfully")
    
    return chroma_client, collection, pdf_subset

if __name__ == "__main__":
    client, collection, subset = main()
    
    print("\n" + "="*60)
    print("🎯 INTERACTIVE MODE")
    print("="*60)
    print("You can now query the collection interactively!")
    print("Example: results = collection.query(query_texts=['your query'], n_results=5)")
