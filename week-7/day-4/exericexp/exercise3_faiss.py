import numpy as np
import faiss
from sentence_transformers import SentenceTransformer

# -----------------------------
# Exercise 3: FAISS Indexing
# -----------------------------

def normalize_vectors(vectors):
    """Normalize vectors for cosine similarity."""
    faiss.normalize_L2(vectors)
    return vectors


def build_faiss_index(embeddings, ids):
    """Create FAISS index and add vectors."""
    dim = embeddings.shape[1]
    index = faiss.IndexIDMap(faiss.IndexFlatIP(dim))
    index.add_with_ids(embeddings, ids)
    return index


def search_content(query, model, index, pdf_to_index, k=3):
    """Search FAISS index for similar content."""
    query_vector = model.encode([query], convert_to_numpy=True)
    faiss.normalize_L2(query_vector)

    similarities, retrieved_ids = index.search(query_vector, k)

    results = pdf_to_index[pdf_to_index["id"].isin(retrieved_ids[0])]
    results = results.copy()
    results["similarities"] = similarities[0]
    return results
