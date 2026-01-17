"""
Exercise 1: Data Loading and Preparation
==========================================
This script loads and prepares the dataset for the RAG pipeline.
"""

import numpy as np
import pandas as pd
import json
import os
from pathlib import Path

def create_cache_directory():
    """Create cache directory if it doesn't exist."""
    cache_dir = Path("cache")
    cache_dir.mkdir(exist_ok=True)
    print(f"✅ Cache directory created/verified at: {cache_dir.absolute()}")
    return cache_dir

def create_sample_dataset():
    """
    Create a sample news dataset since we don't have the original file.
    This simulates the structure of labelled_newscatcher_dataset.csv
    """
    print("\n📰 Creating sample news dataset...")
    
    # Sample news data with various topics
    sample_data = {
        'title': [
            'SpaceX launches new satellite into orbit',
            'Climate change affects global weather patterns',
            'New AI model breaks language understanding records',
            'Stock market reaches all-time high',
            'Scientists discover new species in Amazon rainforest',
            'Electric vehicles sales surge in Europe',
            'Breakthrough in cancer research announced',
            'Major tech company unveils new smartphone',
            'International space station celebrates 25 years',
            'Renewable energy costs drop significantly',
            'Machine learning improves medical diagnosis',
            'Global economy shows signs of recovery',
            'New archaeological discovery in Egypt',
            'Cybersecurity threats increase worldwide',
            'Ocean cleanup project shows promising results'
        ] * 70,  # Repeat to get ~1000+ entries
        'topic': [
            'SCIENCE_AND_TECHNOLOGY',
            'ENVIRONMENT',
            'SCIENCE_AND_TECHNOLOGY',
            'BUSINESS',
            'ENVIRONMENT',
            'BUSINESS',
            'SCIENCE_AND_TECHNOLOGY',
            'SCIENCE_AND_TECHNOLOGY',
            'SCIENCE_AND_TECHNOLOGY',
            'ENVIRONMENT',
            'SCIENCE_AND_TECHNOLOGY',
            'BUSINESS',
            'SCIENCE_AND_TECHNOLOGY',
            'SCIENCE_AND_TECHNOLOGY',
            'ENVIRONMENT'
        ] * 70
    }
    
    df = pd.DataFrame(sample_data)
    
    # Save to CSV for future use
    csv_path = Path("labelled_newscatcher_dataset.csv")
    df.to_csv(csv_path, index=False)
    print(f"✅ Sample dataset saved to: {csv_path.absolute()}")
    
    return df

def load_dataset(path="labelled_newscatcher_dataset.csv"):
    """
    Load the dataset from CSV file.
    If file doesn't exist, create a sample dataset.
    """
    print(f"\n📂 Loading dataset from: {path}")
    
    if not os.path.exists(path):
        print(f"⚠️  Dataset file not found. Creating sample dataset...")
        df = create_sample_dataset()
    else:
        df = pd.read_csv(path)
        print(f"✅ Dataset loaded successfully!")
    
    return df

def add_id_column(pdf):
    """Add unique identifier column to the DataFrame."""
    print("\n🔢 Adding ID column...")
    pdf["id"] = range(len(pdf))
    print(f"✅ Added 'id' column with {len(pdf)} unique identifiers")
    return pdf

def inspect_data(pdf):
    """Display dataset overview and statistics."""
    print("\n" + "="*60)
    print("📊 DATASET OVERVIEW")
    print("="*60)
    
    print(f"\n📏 Dataset Shape: {pdf.shape[0]} rows × {pdf.shape[1]} columns")
    print(f"\n📋 Columns: {list(pdf.columns)}")
    
    print(f"\n📈 Dataset Info:")
    print(pdf.info())
    
    print(f"\n📊 Topic Distribution:")
    print(pdf['topic'].value_counts())
    
    print(f"\n👀 First 5 Rows:")
    print(pdf.head())
    
    print(f"\n🔍 Sample Titles:")
    for i, title in enumerate(pdf['title'].head(10), 1):
        print(f"  {i}. {title}")
    
    return pdf

def create_subset(pdf, n=1000):
    """Create a subset of the DataFrame for faster processing."""
    print(f"\n✂️  Creating subset of {min(n, len(pdf))} rows...")
    pdf_subset = pdf.head(n).copy()
    
    # Save subset for later use
    subset_path = Path("cache/pdf_subset.csv")
    pdf_subset.to_csv(subset_path, index=False)
    print(f"✅ Subset created and saved to: {subset_path.absolute()}")
    print(f"📊 Subset shape: {pdf_subset.shape}")
    
    return pdf_subset

def main():
    """Main execution function."""
    print("\n" + "="*60)
    print("🚀 EXERCISE 1: DATA LOADING AND PREPARATION")
    print("="*60)
    
    # Step 1: Create cache directory
    cache_dir = create_cache_directory()
    
    # Step 2: Load the dataset
    pdf = load_dataset()
    
    # Step 3: Add ID column
    pdf = add_id_column(pdf)
    
    # Step 4: Inspect the data
    pdf = inspect_data(pdf)
    
    # Step 5: Create subset for faster processing
    pdf_subset = create_subset(pdf, n=1000)
    
    print("\n" + "="*60)
    print("✅ EXERCISE 1 COMPLETED SUCCESSFULLY!")
    print("="*60)
    print(f"\n📦 Outputs:")
    print(f"  - Full dataset: {len(pdf)} rows")
    print(f"  - Subset: {len(pdf_subset)} rows")
    print(f"  - Saved to: cache/pdf_subset.csv")
    
    return pdf, pdf_subset

if __name__ == "__main__":
    pdf, pdf_subset = main()
