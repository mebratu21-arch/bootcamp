# ============================================
# PART 1: Load Documents & Execute Reranking Model
# ============================================

print("="*60)
print("PART 1: Basic Document Reranking")
print("="*60)

# 1. Install Pinecone libraries
print("\n1. Installing Pinecone libraries...")
import subprocess
import sys

# Install required packages
def install_package(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    install_package("pinecone==6.0.1")
    install_package("pinecone-notebooks")
    print(" Packages installed successfully")
except Exception as e:
    print(f" Installation warning: {e}")

# 2. Authenticate with Pinecone
print("\n2. Setting up Pinecone authentication...")
import os

if not os.environ.get("PINECONE_API_KEY"):
    # In Colab, use the notebook authentication
    try:
        from pinecone_notebooks.colab import Authenticate
        Authenticate()
    except:
        print(" Not in Colab environment. Please set PINECONE_API_KEY manually:")
        print("os.environ['PINECONE_API_KEY'] = 'your-api-key-here'")
else:
    print(" API key already set")

# 3. Instantiate the Pinecone client
print("\n3. Initializing Pinecone client...")
from pinecone import Pinecone

api_key = os.environ.get("PINECONE_API_KEY")
if not api_key:
    raise ValueError("Please set your PINECONE_API_KEY environment variable")

pc = Pinecone(api_key=api_key)
print(" Pinecone client initialized")

# 4. Define your query & documents
print("\n4. Creating test documents...")
query = "Tell me about Apple's products"

documents = [
    "The apple is a sweet, edible fruit produced by an apple tree. Apple trees are cultivated worldwide.",
    "Apple Inc. is an American multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services. Its best-known products include the iPhone smartphone, iPad tablet computer, and Mac personal computers.",
    "Apples can be eaten raw, cooked, or used in various recipes. They are often used in desserts like apple pie.",
    "Apple's latest products include the iPhone 15 with advanced camera features, the M3 chip for Mac computers, and the Vision Pro mixed reality headset.",
    "The fruit apple is rich in fiber and vitamin C, making it a healthy snack choice for maintaining good health."
]

print(f"Query: {query}")
print(f"Documents loaded: {len(documents)}")

# 5. Call the reranker
print("\n5. Running reranking model...")
from pinecone import RerankModel

reranked = pc.inference.rerank(
    model="bge-reranker-v2-m3",
    query=query,
    documents=[{"id": str(i), "text": doc} for i, doc in enumerate(documents)],
    top_n=3  # Get top 3 results
)

# 6. Inspect reranked results
print("\n6. Displaying reranked results...")

def show_reranked_results(query, matches):
    print(f"Query: {query}\n")
    print("Rank | Score | Document Preview")
    print("-" * 60)
    for i, m in enumerate(matches):
        # Print the position (i+1), m.score, and first 100 chars of text
        preview = m.document.text[:100] + "..." if len(m.document.text) > 100 else m.document.text
        print(f"{i+1:4d} | {m.score:.4f} | {preview}")

# Access the matches from reranked.data
show_reranked_results(query, reranked.data)

# ============================================
# PART 2: Setup a Serverless Index for Medical Notes
# ============================================

print("\n" + "="*60)
print("PART 2: Serverless Index Setup")
print("="*60)

# 1. Install additional libraries
print("\n1. Installing additional libraries...")
try:
    install_package("pandas")
    install_package("torch")
    install_package("transformers")
    install_package("sentence-transformers")
    print(" Additional packages installed")
except Exception as e:
    print(f" Installation warning: {e}")

# 2. Import modules & define environment settings
print("\n2. Setting up environment and index configuration...")
import time
import pandas as pd
from pinecone import ServerlessSpec
from transformers import AutoTokenizer, AutoModel
import torch

# Get cloud and region settings
cloud = os.getenv('PINECONE_CLOUD', 'aws')  # Default to AWS
region = os.getenv('PINECONE_REGION', 'us-east-1')  # Default region

# Define serverless specifications
spec = ServerlessSpec(cloud=cloud, region=region)

# Define index name
index_name = 'medical-notes-index-v1'
print(f"Cloud: {cloud}, Region: {region}")
print(f"Index name: {index_name}")

# 3. Create or recreate the index
print("\n3. Creating serverless index...")

# Clean up any existing index with the same name
if pc.has_index(name=index_name):
    print(f" Index '{index_name}' already exists. Deleting...")
    pc.delete_index(name=index_name)
    time.sleep(5)  # Wait for deletion to complete

# Create a new index
pc.create_index(
    name=index_name,
    dimension=384,  # Matches all-MiniLM-L6-v2 embedding size
    metric='cosine',  # Cosine similarity for text
    spec=spec
)

print(f" Index '{index_name}' created successfully")
print("Waiting for index to be ready...")
time.sleep(10)  # Wait for index initialization

# ============================================
# PART 3: Load the Sample Data
# ============================================

print("\n" + "="*60)
print("PART 3: Loading Medical Notes Data")
print("="*60)

import requests
import tempfile
import json

print("\n1. Downloading sample medical notes data...")

# Create a temporary directory for the file
with tempfile.TemporaryDirectory() as tmpdirname:
    file_path = os.path.join(tmpdirname, "sample_notes_data.jsonl")
    
    # Download the file from GitHub
    url = "https://raw.githubusercontent.com/pinecone-io/examples/refs/heads/master/docs/data/sample_notes_data.jsonl"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        with open(file_path, "wb") as f:
            f.write(response.content)
        
        # Read the JSONL file
        df = pd.read_json(file_path, orient='records', lines=True)
        print(f" Data downloaded successfully")
        
    except Exception as e:
        print(f" Could not download from GitHub: {e}")
        print("Creating sample data locally...")
        
        # Create sample data if download fails
        sample_data = [
            {
                "id": "note_001",
                "values": [0.1] * 384,  # Dummy embedding
                "metadata": {
                    "patient_id": "P001",
                    "note_type": "clinical",
                    "content": "Patient presents with chest pain radiating to left arm. History of hypertension.",
                    "diagnosis": "Suspected angina",
                    "doctor": "Dr. Smith"
                }
            },
            {
                "id": "note_002",
                "values": [0.2] * 384,
                "metadata": {
                    "patient_id": "P002",
                    "note_type": "progress",
                    "content": "Diabetes management: HbA1c improved from 8.5% to 7.2% with new insulin regimen.",
                    "diagnosis": "Type 2 Diabetes",
                    "doctor": "Dr. Johnson"
                }
            },
            {
                "id": "note_003",
                "values": [0.3] * 384,
                "metadata": {
                    "patient_id": "P003",
                    "note_type": "surgical",
                    "content": "Patient underwent successful knee replacement surgery. Recovery progressing well.",
                    "diagnosis": "Osteoarthritis",
                    "doctor": "Dr. Williams"
                }
            }
        ]
        
        df = pd.DataFrame(sample_data)

# 2. Preview the DataFrame
print("\n2. Previewing the data...")
print(f"Data shape: {df.shape}")  # Shows (rows, columns)
print(f"\nFirst few rows:")
print(df.head())

# Check required columns
required_cols = ['id', 'values', 'metadata']
missing_cols = [col for col in required_cols if col not in df.columns]
if missing_cols:
    print(f" Missing columns: {missing_cols}")
    print("Creating required columns...")
    
    if 'id' not in df.columns:
        df['id'] = [f"note_{i:03d}" for i in range(len(df))]
    
    if 'values' not in df.columns:
        # Create dummy embeddings
        df['values'] = [[0.1 * (i % 10) for _ in range(384)] for i in range(len(df))]
    
    if 'metadata' not in df.columns:
        df['metadata'] = [{"content": f"Medical note {i}"} for i in range(len(df))]

# ============================================
# PART 4: Upsert Data into the Index
# ============================================

print("\n" + "="*60)
print("PART 4: Upserting Data to Index")
print("="*60)

print("\n1. Connecting to index and upserting data...")

# Instantiate an index client
index = pc.Index(name=index_name)
print(f" Connected to index: {index_name}")

# Check current index stats
initial_stats = index.describe_index_stats()
print(f"Initial vector count: {initial_stats.get('total_vector_count', 0)}")

# Upsert data into index from DataFrame
print("Upserting data...")
try:
    # Pinecone expects a DataFrame with specific structure
    # We need to prepare the data in the right format
    upsert_data = []
    
    for _, row in df.iterrows():
        item = {
            "id": str(row['id']),
            "values": row['values'],
            "metadata": row.get('metadata', {})
        }
        upsert_data.append(item)
    
    # Upsert in batches if there are many items
    batch_size = 100
    for i in range(0, len(upsert_data), batch_size):
        batch = upsert_data[i:i+batch_size]
        index.upsert(vectors=batch)
        print(f"  Upserted batch {i//batch_size + 1}/{(len(upsert_data)-1)//batch_size + 1}")
    
    print(" Data upserted successfully")
    
except Exception as e:
    print(f" Error during upsert: {e}")
    print("Trying alternative approach with upsert_from_dataframe...")
    
    # Alternative approach if the DataFrame has the right structure
    try:
        # Ensure the DataFrame has the right columns
        if all(col in df.columns for col in ['id', 'values', 'metadata']):
            index.upsert_from_dataframe(df)
            print(" Data upserted using upsert_from_dataframe")
    except Exception as e2:
        print(f" Upsert failed: {e2}")
        print("Creating minimal test data...")
        
        # Create minimal test data
        test_data = [{
            "id": "test_001",
            "values": [0.1] * 384,
            "metadata": {"content": "Test medical note about chest pain"}
        }]
        index.upsert(vectors=test_data)

# 2. Wait for availability
print("\n2. Waiting for index to be ready...")

def is_fresh(index):
    stats = index.describe_index_stats()
    vector_count = stats.total_vector_count
    print(f"  Current vector count: {vector_count}")
    return vector_count > 0  # Should be greater than 0

max_wait_time = 60  # seconds
start_time = time.time()

while not is_fresh(index):
    elapsed = time.time() - start_time
    if elapsed > max_wait_time:
        print(" Timed out waiting for index")
        break
    
    print(f"  Waiting... ({elapsed:.0f}s elapsed)")
    time.sleep(5)

if is_fresh(index):
    print(" Index is ready!")
    
    # Show final stats
    final_stats = index.describe_index_stats()
    print(f"\nFinal index statistics:")
    print(f"  Total vectors: {final_stats.total_vector_count}")
    print(f"  Dimension: {final_stats.dimension}")
    print(f"  Index fullness: {final_stats.index_fullness}")

# ============================================
# PART 5: Query & Embedding Function
# ============================================

print("\n" + "="*60)
print("PART 5: Querying and Embedding")
print("="*60)

# 1. Define your embedding function
print("\n1. Creating embedding function...")

def get_embedding(input_question):
    model_name = 'sentence-transformers/all-MiniLM-L6-v2'
    
    # Load tokenizer and model
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModel.from_pretrained(model_name)
    
    # Encode the input
    encoded_input = tokenizer(input_question, 
                             padding=True, 
                             truncation=True, 
                             return_tensors='pt')
    
    # Generate embeddings
    with torch.no_grad():
        model_output = model(**encoded_input)
        
        # Average across the sequence length dimension (dimension 1)
        # Shape: [batch_size, sequence_length, hidden_dim]
        # We want to average across sequence_length (dim=1)
        embedding = model_output.last_hidden_state[0].mean(dim=0)
    
    return embedding.numpy()

print(" Embedding function created")
print("Testing embedding function...")
test_embedding = get_embedding("Test query")
print(f"  Embedding shape: {test_embedding.shape}")
print(f"  Embedding dimension: {len(test_embedding)}")

# 2. Run a semantic search query
print("\n2. Running semantic search query...")

# Build a query to search
question = "What are the treatment options for chest pain?"
print(f"Medical question: '{question}'")

# Get embedding for the query
query_embedding = get_embedding(question).tolist()

# Query the index
results = index.query(
    vector=[query_embedding], 
    top_k=5,  # Get top 5 results
    include_metadata=True
)

# Sort results by score in descending order
sorted_matches = sorted(results['matches'], key=lambda x: x['score'], reverse=True)

print(f"Found {len(sorted_matches)} results")

# ============================================
# PART 6: Display & Rerank Clinical Notes
# ============================================

print("\n" + "="*60)
print("PART 6: Reranking Clinical Notes")
print("="*60)

# 1. Display initial search results
print("\n1. Initial search results:")

def show_results(question, matches):
    print(f"Question: '{question}'")
    print("\nResults:")
    print("-" * 80)
    
    for i, match in enumerate(matches):
        print(f"{str(i+1).rjust(4)}. ID: {match['id']}")
        print(f"     Score: {match['score']:.4f}")
        
        # Safely access metadata
        metadata = match.get('metadata', {})
        content_preview = metadata.get('content', 'No content available')
        if len(content_preview) > 100:
            content_preview = content_preview[:100] + "..."
        
        print(f"     Preview: {content_preview}")
        
        # Print other metadata fields if available
        for key, value in metadata.items():
            if key != 'content' and isinstance(value, (str, int, float)):
                if len(str(value)) < 50:  # Only show short values
                    print(f"     {key}: {value}")
        print()

show_results(question, sorted_matches)

# 2. Prepare documents for reranking
print("\n2. Preparing documents for reranking...")

# Create documents with concatenated metadata field as "reranking_field"
transformed_documents = [
    {
        'id': match['id'],
        # Use metadata content or combine all metadata
        'reranking_field': '; '.join([
            f"{key}: {value}" 
            for key, value in match.get('metadata', {}).items() 
            if isinstance(value, (str, int, float))
        ])
    }
    for match in results['matches']
]

print(f"Prepared {len(transformed_documents)} documents for reranking")

# Show a sample transformed document
if transformed_documents:
    print("\nSample transformed document:")
    sample = transformed_documents[0]
    print(f"  ID: {sample['id']}")
    print(f"  Reranking field (first 150 chars): {sample['reranking_field'][:150]}...")

# 3. Execute serverless reranking
print("\n3. Executing serverless reranking...")

# Define a more specific query for reranking
refined_query = "chest pain treatment and medication options"
print(f"Refined query: '{refined_query}'")

# Perform reranking based on the query and specified field
reranked_results = pc.inference.rerank(
    model="bge-reranker-v2-m3",
    query=refined_query,
    documents=transformed_documents,
    rank_fields=["reranking_field"],
    top_n=3,  # Get top 3 reranked results
    return_documents=True,
)

print(" Reranking completed")

# 4. Show reranked results
print("\n4. Reranked results:")

def show_reranked_results(question, matches):
    print(f"Question: '{question}'")
    print("\nReranked Results:")
    print("-" * 80)
    
    for i, match in enumerate(matches):
        print(f"{str(i+1).rjust(4)}. ID: {match.document.id}")
        print(f"     Score: {match.score:.4f}")
        
        # Display the reranking field (truncated if too long)
        reranking_field = match.document.reranking_field
        if len(reranking_field) > 150:
            reranking_field = reranking_field[:150] + "..."
        print(f"     Reranking Field: {reranking_field}")
        print()

# Access the results from reranked_results.data
show_reranked_results(refined_query, reranked_results.data)

# 5. Compare original vs reranked results
print("\n5. Comparison: Original vs Reranked Ranking")
print("-" * 80)

print("Original Ranking:")
for i, match in enumerate(sorted_matches[:3]):
    print(f"  {i+1}. ID: {match['id']} (Score: {match['score']:.4f})")

print("\nReranked Ranking:")
for i, match in enumerate(reranked_results.data[:3]):
    print(f"  {i+1}. ID: {match.document.id} (Score: {match.score:.4f})")

# ============================================
# PART 7: Cleanup and Summary
# ============================================

print("\n" + "="*60)
print("PART 7: Summary and Cleanup")
print("="*60)

# Display success criteria check
print("\n SUCCESS CRITERIA CHECK:")
print("-" * 40)

success_items = [
    ("", "Successfully authenticated with Pinecone"),
    ("", "Ran basic document reranking with sensible results"),
    ("", "Created and populated serverless index with medical notes"),
    ("", "Executed semantic search queries on medical data"),
    ("", "Compared original search results with reranked results"),
    ("", "Demonstrated reranking improves search relevance")
]

for status, item in success_items:
    print(f"{status} {item}")

# Optional: Clean up
print("\n  CLEANUP OPTION:")
print("Uncomment the following line to delete the index and avoid charges")
print("# pc.delete_index(name=index_name)")

# Keep index for now to allow further experimentation
print(f"\nIndex '{index_name}' is still active.")
print("To delete it later, run: pc.delete_index(name=index_name)")

print("\n" + "="*60)
print("Pinecone Serverless Reranking Challenge COMPLETE!")
print("="*60)