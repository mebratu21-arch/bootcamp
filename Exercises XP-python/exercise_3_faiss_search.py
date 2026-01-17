"""
Exercise 3: FAISS Indexing and Search
======================================
This script creates a FAISS index for efficient similarity search.
"""

import numpy as np
import pandas as pd
import faiss
import pickle
from pathlib import Path
from sentence_transformers import SentenceTransformer

def load_embeddings_and_data():
    """Load embeddings and data from previous exercises."""
    cache_dir = Path("cache")
    
    print("📂 Loading embeddings and data...")
    
    # Load embeddings
    embeddings_path = cache_dir / "faiss_title_embeddings.npy"
    if not embeddings_path.exists():
        raise FileNotFoundError(
            f"Embeddings not found at {embeddings_path}. "
            "Please run exercise_2_vectorization.py first."
        )
    
    faiss_title_embedding = np.load(embeddings_path)
    print(f"✅ Loaded {len(faiss_title_embedding)} embeddings")
    
    # Load titles
    titles_path = cache_dir / "titles_list.pkl"
    with open(titles_path, 'rb') as f:
        titles_list = pickle.load(f)
    print(f"✅ Loaded {len(titles_list)} titles")
    
    # Load subset DataFrame
    pdf_subset = pd.read_csv(cache_dir / "pdf_subset.csv")
    print(f"✅ Loaded subset DataFrame with {len(pdf_subset)} rows")
    
    return faiss_title_embedding, titles_list, pdf_subset

def prepare_for_indexing(pdf_subset, faiss_title_embedding):
    """
    Prepare data for FAISS indexing.
    
    Args:
        pdf_subset (pd.DataFrame): Subset of news data
        faiss_title_embedding (np.ndarray): Array of embeddings
    
    Returns:
        tuple: (pdf_to_index, id_index, content_encoded_normalized)
    """
    print("\n🔧 Preparing data for indexing...")
    
    # DataFrame to index
    pdf_to_index = pdf_subset.copy()
    
    # Create ID index as numpy array
    id_index = np.array(pdf_to_index["id"].values, dtype=np.int64)
    print(f"✅ Created ID index: {len(id_index)} IDs")
    
    # Copy and normalize embeddings
    content_encoded_normalized = faiss_title_embedding.copy().astype('float32')
    
    print(f"✅ Prepared {len(content_encoded_normalized)} embeddings for indexing")
    
    return pdf_to_index, id_index, content_encoded_normalized

def normalize_vectors(content_encoded_normalized):
    """
    Normalize vectors for cosine similarity search.
    
    Args:
        content_encoded_normalized (np.ndarray): Embeddings to normalize
    
    Returns:
        np.ndarray: Normalized embeddings
    """
    print("\n📐 Normalizing vectors for cosine similarity...")
    
    # L2 normalization (makes vectors unit length)
    faiss.normalize_L2(content_encoded_normalized)
    
    print(f"✅ Vectors normalized")
    print(f"   Sample vector norm: {np.linalg.norm(content_encoded_normalized[0]):.6f} (should be ~1.0)")
    
    return content_encoded_normalized

def create_faiss_index(content_encoded_normalized, id_index):
    """
    Create FAISS index with ID mapping.
    
    Args:
        content_encoded_normalized (np.ndarray): Normalized embeddings
        id_index (np.ndarray): Array of IDs
    
    Returns:
        faiss.IndexIDMap: FAISS index with ID mapping
    """
    print("\n🏗️  Creating FAISS index...")
    
    # Get embedding dimension
    embedding_dim = content_encoded_normalized.shape[1]
    print(f"   Embedding dimension: {embedding_dim}")
    
    # Create IndexFlatIP (Inner Product) for cosine similarity
    base_index = faiss.IndexFlatIP(embedding_dim)
    
    # Wrap with IndexIDMap to preserve IDs
    index_content = faiss.IndexIDMap(base_index)
    
    # Add vectors with IDs
    index_content.add_with_ids(content_encoded_normalized, id_index)
    
    print(f"✅ Index created successfully!")
    print(f"   Total vectors in index: {index_content.ntotal}")
    
    return index_content

def search_content(query, pdf_to_index, index_content, model, k=3):
    """
    Search for similar content using a text query.
    
    Args:
        query (str): Search query text
        pdf_to_index (pd.DataFrame): DataFrame to retrieve results from
        index_content (faiss.IndexIDMap): FAISS index
        model (SentenceTransformer): Model for encoding query
        k (int): Number of results to return
    
    Returns:
        pd.DataFrame: Top-k matching articles with similarity scores
    """
    # Encode query
    query_vector = model.encode([query], convert_to_numpy=True).astype('float32')
    
    # Normalize query vector
    faiss.normalize_L2(query_vector)
    
    # Search
    similarities, ids = index_content.search(query_vector, k)
    
    # Get results
    results = pdf_to_index[pdf_to_index["id"].isin(ids[0])].copy()
    
    # Add similarity scores
    # Map IDs to their similarity scores
    id_to_sim = dict(zip(ids[0], similarities[0]))
    results["similarity"] = results["id"].map(id_to_sim)
    
    # Sort by similarity (highest first)
    results = results.sort_values("similarity", ascending=False)
    
    return results

def test_search(index_content, pdf_to_index, model):
    """
    Test the search functionality with example queries.
    
    Args:
        index_content (faiss.IndexIDMap): FAISS index
        pdf_to_index (pd.DataFrame): DataFrame to search
        model (SentenceTransformer): Embedding model
    """
    print("\n" + "="*60)
    print("🔍 TESTING SEARCH FUNCTIONALITY")
    print("="*60)
    
    test_queries = [
        ("space", 5),
        ("climate", 3),
        ("technology", 5),
        ("business economy", 3)
    ]
    
    for query, k in test_queries:
        print(f"\n{'─'*60}")
        print(f"🔎 Query: '{query}' (top {k} results)")
        print(f"{'─'*60}")
        
        results = search_content(query, pdf_to_index, index_content, model, k=k)
        
        for idx, row in results.iterrows():
            print(f"\n  📰 [{row['similarity']:.4f}] {row['title']}")
            print(f"     Topic: {row['topic']}")

def main():
    """Main execution function."""
    print("\n" + "="*60)
    print("🚀 EXERCISE 3: FAISS INDEXING AND SEARCH")
    print("="*60)
    
    # Load model for query encoding
    print("\n🤖 Loading Sentence Transformer model...")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    print("✅ Model loaded")
    
    # Step 1: Load embeddings and data
    faiss_title_embedding, titles_list, pdf_subset = load_embeddings_and_data()
    
    # Step 2: Prepare for indexing
    pdf_to_index, id_index, content_encoded_normalized = prepare_for_indexing(
        pdf_subset, faiss_title_embedding
    )
    
    # Step 3: Normalize vectors
    content_encoded_normalized = normalize_vectors(content_encoded_normalized)
    
    # Step 4: Create FAISS index
    index_content = create_faiss_index(content_encoded_normalized, id_index)
    
    # Step 5: Test search functionality
    test_search(index_content, pdf_to_index, model)
    
    print("\n" + "="*60)
    print("✅ EXERCISE 3 COMPLETED SUCCESSFULLY!")
    print("="*60)
    print(f"\n📦 Outputs:")
    print(f"  - FAISS index created with {index_content.ntotal} vectors")
    print(f"  - Search functionality tested")
    
    return index_content, pdf_to_index, model

if __name__ == "__main__":
    index, pdf_to_index, model = main()
    
    # Interactive search
    print("\n" + "="*60)
    print("🎯 INTERACTIVE SEARCH")
    print("="*60)
    print("You can now search for articles!")
    print("Example: results = search_content('your query', pdf_to_index, index, model, k=5)")
