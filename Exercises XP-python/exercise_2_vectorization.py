"""
Exercise 2: Vectorization with Sentence Transformers
=====================================================
This script generates embeddings for news titles using Sentence Transformers.
"""

import numpy as np
import pandas as pd
import pickle
from pathlib import Path
from sentence_transformers import SentenceTransformer, InputExample

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

def example_create_fn(title):
    """
    Helper function that creates a sentence_transformer InputExample.
    
    Args:
        title (str): The news title text
    
    Returns:
        InputExample: Formatted input for SentenceTransformer
    """
    return InputExample(texts=[title])

def prepare_training_examples(pdf_subset):
    """
    Convert DataFrame titles into InputExample objects.
    
    Args:
        pdf_subset (pd.DataFrame): Subset of news data
    
    Returns:
        list: List of InputExample objects
    """
    print("\n📝 Preparing training examples...")
    
    faiss_train_examples = pdf_subset.apply(
        lambda x: example_create_fn(x["title"]), 
        axis=1
    ).tolist()
    
    print(f"✅ Created {len(faiss_train_examples)} training examples")
    print(f"\n👀 First 3 examples:")
    for i, example in enumerate(faiss_train_examples[:3], 1):
        print(f"  {i}. {example.texts[0][:60]}...")
    
    return faiss_train_examples

def initialize_model(model_name='all-MiniLM-L6-v2'):
    """
    Initialize the Sentence Transformer model.
    
    Args:
        model_name (str): Name of the pre-trained model
    
    Returns:
        SentenceTransformer: Initialized model
    """
    print(f"\n🤖 Initializing Sentence Transformer model: {model_name}")
    print("⏳ This may take a moment on first run (downloading model)...")
    
    model = SentenceTransformer(model_name)
    
    print(f"✅ Model loaded successfully!")
    print(f"📊 Model details:")
    print(f"  - Max sequence length: {model.max_seq_length}")
    print(f"  - Embedding dimension: {model.get_sentence_embedding_dimension()}")
    
    return model

def extract_titles(pdf_subset):
    """
    Extract titles from DataFrame and convert to list.
    
    Args:
        pdf_subset (pd.DataFrame): Subset of news data
    
    Returns:
        list: List of title strings
    """
    print("\n📋 Extracting titles...")
    titles_list = pdf_subset["title"].tolist()
    
    print(f"✅ Extracted {len(titles_list)} titles")
    print(f"\n🔍 Sample titles:")
    for i, title in enumerate(titles_list[:5], 1):
        print(f"  {i}. {title}")
    
    return titles_list

def generate_embeddings(model, titles_list):
    """
    Generate embeddings for all titles.
    
    Args:
        model (SentenceTransformer): The embedding model
        titles_list (list): List of title strings
    
    Returns:
        np.ndarray: Array of embeddings
    """
    print("\n🔮 Generating embeddings...")
    print("⏳ This may take a few moments depending on dataset size...")
    
    faiss_title_embedding = model.encode(
        titles_list,
        show_progress_bar=True,
        convert_to_numpy=True
    )
    
    print(f"✅ Embeddings generated successfully!")
    
    return faiss_title_embedding

def verify_embeddings(embeddings):
    """
    Verify and display embedding statistics.
    
    Args:
        embeddings (np.ndarray): Array of embeddings
    """
    print("\n" + "="*60)
    print("📊 EMBEDDING STATISTICS")
    print("="*60)
    
    num_embeddings = len(embeddings)
    embedding_dim = len(embeddings[0])
    
    print(f"\n📏 Dimensions:")
    print(f"  - Number of embeddings: {num_embeddings}")
    print(f"  - Embedding dimension: {embedding_dim}")
    print(f"  - Total shape: {embeddings.shape}")
    
    print(f"\n📈 Statistics:")
    print(f"  - Mean: {embeddings.mean():.6f}")
    print(f"  - Std:  {embeddings.std():.6f}")
    print(f"  - Min:  {embeddings.min():.6f}")
    print(f"  - Max:  {embeddings.max():.6f}")
    
    print(f"\n🔍 Sample embedding (first 10 dimensions):")
    print(f"  {embeddings[0][:10]}")

def save_embeddings(embeddings, titles_list, pdf_subset):
    """
    Save embeddings and related data for use in next exercises.
    
    Args:
        embeddings (np.ndarray): Array of embeddings
        titles_list (list): List of titles
        pdf_subset (pd.DataFrame): Subset DataFrame
    """
    cache_dir = Path("cache")
    cache_dir.mkdir(exist_ok=True)
    
    # Save embeddings as numpy file
    embeddings_path = cache_dir / "faiss_title_embeddings.npy"
    np.save(embeddings_path, embeddings)
    print(f"\n💾 Saved embeddings to: {embeddings_path}")
    
    # Save titles list
    titles_path = cache_dir / "titles_list.pkl"
    with open(titles_path, 'wb') as f:
        pickle.dump(titles_list, f)
    print(f"💾 Saved titles list to: {titles_path}")
    
    print(f"\n✅ All data saved successfully!")

def main():
    """Main execution function."""
    print("\n" + "="*60)
    print("🚀 EXERCISE 2: VECTORIZATION WITH SENTENCE TRANSFORMERS")
    print("="*60)
    
    # Step 1: Load subset
    pdf_subset = load_subset()
    
    # Step 2: Prepare training examples
    faiss_train_examples = prepare_training_examples(pdf_subset)
    
    # Step 3: Initialize model
    model = initialize_model('all-MiniLM-L6-v2')
    
    # Step 4: Extract titles
    titles_list = extract_titles(pdf_subset)
    
    # Step 5: Generate embeddings
    faiss_title_embedding = generate_embeddings(model, titles_list)
    
    # Step 6: Verify embeddings
    verify_embeddings(faiss_title_embedding)
    
    # Step 7: Save for next exercise
    save_embeddings(faiss_title_embedding, titles_list, pdf_subset)
    
    print("\n" + "="*60)
    print("✅ EXERCISE 2 COMPLETED SUCCESSFULLY!")
    print("="*60)
    print(f"\n📦 Outputs:")
    print(f"  - {len(faiss_title_embedding)} embeddings generated")
    print(f"  - Dimension: {len(faiss_title_embedding[0])}")
    print(f"  - Saved to: cache/faiss_title_embeddings.npy")
    
    return model, faiss_title_embedding, titles_list, pdf_subset

if __name__ == "__main__":
    model, embeddings, titles, subset = main()
