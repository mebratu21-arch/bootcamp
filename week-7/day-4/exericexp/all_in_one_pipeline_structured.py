"""
All-in-One Pipeline: Exercises 1-5 (Structured Version)
1 Data Loading & Preparation
2 Vectorization with Sentence Transformers
3 FAISS Indexing & Search
4 ChromaDB Collection & Querying
5 Question Answering with Hugging Face Model
"""

# -------------------------------
# 1 Exercise 1: Data Loading and Preparation
# -------------------------------
import os
import pandas as pd
import numpy as np

os.makedirs("cache", exist_ok=True)  # Cache directory for intermediate files

# Load dataset
DATA_PATH = "data/labelled_newscatcher_dataset.csv"
pdf = pd.read_csv(DATA_PATH)

# Add unique ID
pdf["id"] = range(len(pdf))

# Create a manageable subset for development
pdf_subset = pdf.head(1000)
print(f"[Exercise 1] Dataset loaded and subset created: {pdf_subset.shape}")

# -------------------------------
# 2 Exercise 2: Vectorization with Sentence Transformers
# -------------------------------
from sentence_transformers import SentenceTransformer, InputExample

# Helper function to convert title to InputExample
def example_create_fn(title: str) -> InputExample:
    return InputExample(texts=[title], label=0)  # label is dummy

# Apply helper function to the subset
faiss_train_examples = pdf_subset["title"].apply(example_create_fn).tolist()
print(f"[Exercise 2] First 5 InputExample objects:")
print(faiss_train_examples[:5])

# Initialize embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Extract titles as a list of strings
titles_list = pdf_subset["title"].tolist()

# Generate embeddings for the titles
faiss_title_embedding = model.encode(titles_list, convert_to_numpy=True)
print(f"[Exercise 2] Embeddings generated: {faiss_title_embedding.shape}")

# -------------------------------
# 3 Exercise 3: FAISS Indexing and Search
# -------------------------------
import faiss

# Normalize embeddings for cosine similarity
faiss.normalize_L2(faiss_title_embedding)

# Create FAISS index
dimension = faiss_title_embedding.shape[1]
index_content = faiss.IndexIDMap(faiss.IndexFlatIP(dimension))

# ID array for each article
id_index = np.array(pdf_subset["id"].tolist())

# Add embeddings to the index
index_content.add_with_ids(faiss_title_embedding, id_index)
print("[Exercise 3] FAISS index created.")

# Search function
def search_content(query, pdf_to_index, k=5):
    query_vec = model.encode([query], convert_to_numpy=True)
    faiss.normalize_L2(query_vec)
    similarities, ids = index_content.search(query_vec, k)
    results = pdf_to_index[pdf_to_index["id"].isin(ids[0])].copy()
    results["similarities"] = similarities[0]
    return results

# -------------------------------
# 4 Exercise 4: ChromaDB Collection and Querying
# -------------------------------
import chromadb

# Initialize ChromaDB client
chroma_client = chromadb.Client()
collection_name = "my_news"

# Delete collection if it exists
for col in chroma_client.list_collections():
    if col.name == collection_name:
        chroma_client.delete_collection(name=collection_name)

# Create collection
collection = chroma_client.create_collection(name=collection_name)

# Add first 100 articles to collection
collection.add(
    documents=pdf_subset["title"][:100].tolist(),
    metadatas=[{"topic": topic} for topic in pdf_subset["topic"][:100].tolist()],
    ids=[str(i) for i in pdf_subset["id"][:100].tolist()]
)
print("[Exercise 4] ChromaDB collection ready.")

# -------------------------------
# 5 Exercise 5: Question Answering with Hugging Face Model
# -------------------------------
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

# Load model and tokenizer
model_id = "gpt2"
tokenizer = AutoTokenizer.from_pretrained(model_id)
lm_model = AutoModelForCausalLM.from_pretrained(model_id)

# Create text generation pipeline
pipe = pipeline(
    "text-generation",
    model=lm_model,
    tokenizer=tokenizer,
    max_new_tokens=512,
    device_map="auto"
)
print("[Exercise 5] Hugging Face model ready.")

# -------------------------------
# Interactive Pipeline: Query + Q/A
# -------------------------------
while True:
    print("\n--- Interactive Pipeline ---")
    query = input("Enter search query (or 'exit' to quit): ")
    if query.lower() == "exit":
        break
    k_results = int(input("Number of top articles to retrieve: "))

    # FAISS search
    faiss_results = search_content(query, pdf_subset, k=k_results)
    print("\nTop articles from FAISS:")
    for i, row in faiss_results.iterrows():
        print(f"{i+1}. {row['title']} (Similarity: {row['similarities']:.4f})")

    # ChromaDB search
    chroma_results = collection.query(query_texts=[query], n_results=k_results)
    print("\nTop articles from ChromaDB:")
    for i, doc in enumerate(chroma_results["documents"][0]):
        print(f"{i+1}. {doc}")

    # Question Answering
    question = input("\nEnter your question: ")
    context = " ".join(chroma_results["documents"][0])
    prompt_template = f"Relevant context: {context}\n\nThe user's question: {question}"

    lm_response = pipe(prompt_template)
    print("\nGenerated answer:")
    print(lm_response[0]["generated_text"])


