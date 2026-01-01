import os
from pinecone import Pinecone, ServerlessSpec
from .config import CLOUD, REGION, INDEX_NAME

def init_pinecone():
    """Authenticate and return a Pinecone client."""
    api_key = os.environ.get("PINECONE_API_KEY")
    if not api_key:
        raise ValueError("PINECONE_API_KEY not found in environment variables.")
    return Pinecone(api_key=api_key)

def create_index(pc: Pinecone, dimension: int = 384, metric: str = "cosine"):
    """Create a serverless index if it doesn't exist."""
    spec = ServerlessSpec(cloud=CLOUD, region=REGION)

    if pc.has_index(INDEX_NAME):
        pc.delete_index(INDEX_NAME)

    pc.create_index(
        name=INDEX_NAME,
        dimension=dimension,
        metric=metric,
        spec=spec
    )

def get_index(pc: Pinecone):
    """Return an index client."""
    return pc.Index(INDEX_NAME)

def wait_until_ready(index, min_vectors: int = 1):
    """Wait until the index has at least `min_vectors` vectors."""
    import time
    while True:
        stats = index.describe_index_stats()
        if stats.total_vector_count >= min_vectors:
            break
        time.sleep(5)
