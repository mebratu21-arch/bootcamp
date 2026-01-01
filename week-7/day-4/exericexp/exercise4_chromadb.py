import chromadb
from chromadb.config import Settings

# -----------------------------
# Exercise 4: ChromaDB
# -----------------------------

def init_chroma():
    """Initialize ChromaDB client."""
    return chromadb.Client(Settings(chroma_db_impl="duckdb+parquet", persist_directory="chroma_store"))


def create_collection(client, name="my_news"):
    """Create or reset a ChromaDB collection."""
    existing = [c.name for c in client.list_collections()]
    if name in existing:
        client.delete_collection(name=name)

    return client.create_collection(name=name)


def add_documents(collection, pdf_subset):
    """Add first 100 titles + metadata to ChromaDB."""
    documents = pdf_subset["title"][:100].tolist()
    metadatas = [{"topic": t} for t in pdf_subset["topic"][:100].tolist()]
    ids = [str(i) for i in range(len(documents))]

    collection.add(
        documents=documents,
        metadatas=metadatas,
        ids=ids
    )


def query_collection(collection, query_text, k=10):
    """Query ChromaDB collection."""
    return collection.query(
        query_texts=[query_text],
        n_results=k
    )
