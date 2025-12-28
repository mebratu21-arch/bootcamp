# ============================
# Exercise 1: Data Loading and Preparation
# ============================

import numpy as np
import pandas as pd
import faiss
import json
import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer, InputExample
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
import os
import warnings
warnings.filterwarnings('ignore')

# 1. Load the dataset
print("Loading dataset...")
# Update this path to where your CSV file is located
path = "labelled_newscatcher_dataset.csv"  # Change this to your actual file path
pdf = pd.read_csv(path)

# 2. Add an identifier column
pdf["id"] = pdf.index.astype(str)  # Using index as ID

# 3. Inspect the data
print("Dataset shape:", pdf.shape)
print("\nFirst few rows:")
display(pdf.head())

# 4. Create a subset for faster processing (first 1000 rows)
pdf_subset = pdf.head(1000).copy()
print(f"\nCreated subset with {len(pdf_subset)} rows")

# Check for missing values
print("\nMissing values in subset:")
print(pdf_subset.isnull().sum())

# ============================
# Exercise 2: Vectorization with Sentence Transformers
# ============================

print("\n" + "="*50)
print("Exercise 2: Vectorization with Sentence Transformers")
print("="*50)

# 1. Create helper function
def example_create_fn(doc1: pd.Series) -> InputExample:
    """
    Helper function that outputs a sentence_transformer guid, label, and text.
    """
    return InputExample(
        guid=str(doc1.name),  # Using the DataFrame index as guid
        label=0,  # Default label (not used for inference)
        texts=[str(doc1)]  # The text to encode
    )

# 2. Apply the helper function to the subset
print("Creating training examples...")
faiss_train_examples = pdf_subset.apply(lambda x: example_create_fn(x["title"]), axis=1).tolist()
print(f"Created {len(faiss_train_examples)} training examples")

# 3. Initialize the embedding model
print("\nLoading Sentence Transformer model...")
model = SentenceTransformer('all-MiniLM-L6-v2')
print("Model loaded successfully!")

# 4. Extract titles and convert to list
titles_list = pdf_subset["title"].fillna("").astype(str).tolist()
print(f"Prepared {len(titles_list)} titles for embedding")

# 5. Generate embeddings for the titles
print("\nGenerating embeddings (this may take a moment)...")
faiss_title_embedding = model.encode(titles_list, show_progress_bar=True)
print(f"Generated embeddings with shape: {faiss_title_embedding.shape}")

# 6. Check embedding dimensions
print(f"\nNumber of embeddings: {len(faiss_title_embedding)}")
print(f"Dimension of each embedding: {len(faiss_title_embedding[0])}")

# ============================
# Exercise 3: FAISS Indexing and Search
# ============================

print("\n" + "="*50)
print("Exercise 3: FAISS Indexing and Search")
print("="*50)

# 1. Prepare data for indexing
pdf_to_index = pdf_subset.copy()
id_index = np.array(pdf_to_index.index).astype(np.int64)

# 2. Normalize the embedding vectors (for cosine similarity)
print("Normalizing embedding vectors...")
content_encoded_normalized = faiss_title_embedding.copy().astype('float32')
faiss.normalize_L2(content_encoded_normalized)
print("Vectors normalized!")

# 3. Create the FAISS index
print("\nCreating FAISS index...")
d = len(faiss_title_embedding[0])  # Dimension of embeddings
index_content = faiss.IndexIDMap(faiss.IndexFlatIP(d))
index_content.add_with_ids(content_encoded_normalized, id_index)
print(f"Index created with {index_content.ntotal} vectors")

# 4. Implement search function
def search_content(query, pdf_to_index, k=3):
    """
    Search for similar content using FAISS.
    
    Args:
        query (str): The search query
        pdf_to_index (pd.DataFrame): DataFrame containing the indexed content
        k (int): Number of results to return
    
    Returns:
        pd.DataFrame: Top-k matching results with similarity scores
    """
    # Encode the query
    query_vector = model.encode([query])
    query_vector = query_vector.astype('float32')
    
    # Normalize the query vector
    faiss.normalize_L2(query_vector)
    
    # Perform the search
    distances, indices = index_content.search(query_vector, k)
    
    # Get the results
    results = pdf_to_index.iloc[indices[0]].copy()
    similarities = distances[0]
    
    # Add similarity scores
    results["similarities"] = similarities
    
    return results

# 5. Test the search function
print("\nTesting search function with query: 'animal'")
test_results = search_content("animal", pdf_to_index, k=5)
display(test_results[['title', 'topic', 'similarities']].head())

# ============================
# Exercise 4: ChromaDB Collection and Querying
# ============================

print("\n" + "="*50)
print("Exercise 4: ChromaDB Collection and Querying")
print("="*50)

# 1. Initialize ChromaDB client
print("Initializing ChromaDB client...")
chroma_client = chromadb.Client()

# 2. Create a collection
collection_name = "my_news"
print(f"\nCreating collection: '{collection_name}'")

# Delete collection if it exists
try:
    chroma_client.delete_collection(name=collection_name)
    print(f"Deleted existing collection '{collection_name}'")
except:
    print(f"Collection '{collection_name}' doesn't exist or couldn't be deleted")

# Create new collection
collection = chroma_client.create_collection(name=collection_name)
print(f"Collection '{collection_name}' created successfully!")

# 3. Add data to the collection
print("\nAdding data to ChromaDB collection...")
num_docs = 100  # Using first 100 documents as per instructions

# Prepare data
documents = pdf_subset["title"][:num_docs].fillna("").astype(str).tolist()
metadatas = [{"topic": str(topic)} for topic in pdf_subset["topic"][:num_docs].tolist()]
ids = [str(i) for i in range(num_docs)]

# Add to collection
collection.add(
    documents=documents,
    metadatas=metadatas,
    ids=ids
)
print(f"Added {num_docs} documents to ChromaDB collection")

# 4. Query the collection
print("\nQuerying collection with term: 'space'")
results = collection.query(
    query_texts=["space"],
    n_results=10,
    include=["documents", "metadatas", "distances"]
)

print("\nTop 10 results for query 'space':")
print(json.dumps(results, indent=2))

# ============================
# Exercise 5: Question Answering with Hugging Face Model
# ============================

print("\n" + "="*50)
print("Exercise 5: Question Answering with Hugging Face Model")
print("="*50)

# 1. Initialize the model and tokenizer
print("Loading Hugging Face model...")
model_id = "gpt2"  # You can change this to other models like "distilgpt2"

try:
    tokenizer = AutoTokenizer.from_pretrained(model_id)
    lm_model = AutoModelForCausalLM.from_pretrained(model_id)
    print(f"Model '{model_id}' loaded successfully!")
    
    # Set padding token if not present
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token
    
except Exception as e:
    print(f"Error loading model: {e}")
    print("Falling back to a simpler approach...")
    # Fallback: Use pipeline without specific model loading
    model_id = "gpt2"

# 2. Create a text generation pipeline
print("\nCreating text generation pipeline...")
pipe = pipeline(
    "text-generation",
    model=model_id,  # Using model_id directly for fallback compatibility
    tokenizer=tokenizer if 'tokenizer' in locals() else model_id,
    max_new_tokens=100,  # Reduced for faster generation
    temperature=0.7,
    do_sample=True,
    device_map="auto" if torch.cuda.is_available() else None,
)
print("Pipeline created successfully!")

# 3. Construct a prompt template
print("\nConstructing prompt for question answering...")
question = "What's the latest news on space development?"

# Use results from ChromaDB query
if 'results' in locals() and results['documents']:
    # Join the retrieved documents as context
    context = " ".join([doc for doc_list in results['documents'] for doc in doc_list])
else:
    # Fallback context if ChromaDB results aren't available
    context = " ".join(pdf_subset["title"][:5].tolist())

# Create prompt
prompt_template = f"""Relevant context: {context}

The user's question: {question}

Based on the context above, please answer the question:"""

print(f"Prompt length: {len(prompt_template)} characters")

# 4. Generate a response using the pipeline
print("\nGenerating response...")
try:
    lm_response = pipe(
        prompt_template,
        max_length=200,
        num_return_sequences=1
    )
    
    print("\n" + "="*50)
    print("GENERATED RESPONSE:")
    print("="*50)
    print(lm_response[0]["generated_text"])
    
except Exception as e:
    print(f"Error generating response: {e}")
    print("\nSample response (for demonstration):")
    print("Based on the context provided about space exploration and satellite launches, ")
    print("the latest developments include new satellite deployments and ongoing research ")
    print("into deep space exploration technologies.")

# ============================
# Additional Utility Functions
# ============================

print("\n" + "="*50)
print("Additional Utility Functions")
print("="*50)

def compare_search_results(query, faiss_k=5, chroma_k=5):
    """
    Compare search results from FAISS and ChromaDB for the same query.
    """
    print(f"\nComparing search results for query: '{query}'")
    
    # FAISS results
    print("\n1. FAISS Results:")
    faiss_results = search_content(query, pdf_to_index, k=faiss_k)
    for i, (_, row) in enumerate(faiss_results.iterrows()):
        print(f"  {i+1}. {row['title'][:80]}... (Similarity: {row['similarities']:.4f})")
    
    # ChromaDB results
    print("\n2. ChromaDB Results:")
    chroma_results = collection.query(
        query_texts=[query],
        n_results=chroma_k,
        include=["documents", "distances"]
    )
    
    for i, (doc, distance) in enumerate(zip(chroma_results['documents'][0], chroma_results['distances'][0])):
        print(f"  {i+1}. {doc[:80]}... (Distance: {distance:.4f})")

# Test the comparison function
compare_search_results("technology", faiss_k=3, chroma_k=3)

print("\n" + "="*50)
print("RAG Pipeline Implementation Complete!")
print("="*50)
print("\nSummary:")
print(f"- Loaded dataset with {len(pdf)} rows")
print(f"- Created subset with {len(pdf_subset)} rows")
print(f"- Generated {len(faiss_title_embedding)} embeddings")
print(f"- Built FAISS index with {index_content.ntotal} vectors")
print(f"- Created ChromaDB collection with {num_docs} documents")
print(f"- Implemented Q&A pipeline with model: {model_id}")