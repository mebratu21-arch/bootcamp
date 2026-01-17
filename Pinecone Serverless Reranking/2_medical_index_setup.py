import os
import time
import requests
import tempfile
import pandas as pd
from typing import Optional
from pinecone import Pinecone, ServerlessSpec
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def setup_medical_index() -> None:
    """
    Configures and populates a serverless index for medical notes.
    Covers Part 2 and Part 3 of the challenge.
    """
    # 1. Client Initialization
    api_key = os.environ.get("PINECONE_API_KEY")
    if not api_key:
        print("❌ Error: PINECONE_API_KEY not found.")
        return
    pc = Pinecone(api_key=api_key)

    # 2. Environment Settings
    cloud = os.getenv('PINECONE_CLOUD', 'aws')
    region = os.getenv('PINECONE_REGION', 'us-east-1')
    index_name = 'medical-notes-index'
    
    spec = ServerlessSpec(cloud=cloud, region=region)
    print(f"⚙️  Configuring Serverless Index: '{index_name}' on {cloud}/{region}")

    # 3. Create or Recreate Index
    if pc.has_index(index_name):
        print(f"🗑️  Index '{index_name}' already exists. Deleting to start fresh...")
        pc.delete_index(index_name)
    
    print(f"✨ Creating index '{index_name}' (dim=384, metric='cosine')...")
    pc.create_index(
        name=index_name,
        dimension=384,
        metric='cosine',
        spec=spec
    )
    print("✅ Index created successfully.")

    # 4. Load Sample Data (Part 3)
    print("\n📩 Downloading sample medical data...")
    url = "https://raw.githubusercontent.com/pinecone-io/examples/refs/heads/master/docs/data/sample_notes_data.jsonl"
    
    try:
        with tempfile.TemporaryDirectory() as tmpdirname:
            file_path = os.path.join(tmpdirname, "sample_notes_data.jsonl")
            response = requests.get(url)
            response.raise_for_status()

            with open(file_path, "wb") as f:
                f.write(response.content)

            df = pd.read_json(file_path, orient='records', lines=True)
            print(f"📊 Data loaded. Shape: {df.shape}")
            print("\nPreview:")
            print(df.head())

            # 5. Upsert Data (Part 4 Instructions start here)
            print(f"\n🚀 Upserging {len(df)} vectors into '{index_name}'...")
            index = pc.Index(name=index_name)
            index.upsert_from_dataframe(df)

            # 6. Wait for availability
            print("⏳ Waiting for index to become available and fresh...")
            while not is_fresh(index):
                time.sleep(5)
            
            print("\n🚀 Index ready!")
            print(index.describe_index_stats())

    except Exception as e:
        print(f"❌ Error during data loading/upsert: {e}")

def is_fresh(index) -> bool:
    """
    Checks if index has at least some vectors.
    """
    try:
        stats = index.describe_index_stats()
        count = stats.total_vector_count
        print(f"   Current vector count: {count}")
        return count > 0
    except Exception:
        return False

if __name__ == "__main__":
    setup_medical_index()
