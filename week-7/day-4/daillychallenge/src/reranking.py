from pinecone import RerankModel
from .config import RERANK_MODEL

def prepare_rerank_documents(matches):
    """Convert Pinecone matches into reranker‑friendly documents."""
    docs = []
    for m in matches:
        metadata = m["metadata"]
        text = "; ".join([f"{k}: {v}" for k, v in metadata.items()])
        docs.append({
            "id": m["id"],
            "reranking_field": text
        })
    return docs

def run_reranker(pc, query, documents, top_n=3):
    """Run Pinecone's reranker on metadata fields."""
    return pc.inference.rerank(
        model=RERANK_MODEL,
        query=query,
        documents=documents,
        rank_fields=["reranking_field"],
        top_n=top_n,
        return_documents=True
    )

def show_reranked_results(question, matches):
    """Pretty‑print reranked results."""
    print(f"Question: '{question}'\n")
    print("Reranked Results:")
    for i, match in enumerate(matches):
        print(f"{str(i+1).rjust(4)}. ID: {match.document.id}")
        print(f" Score: {match.score}")
        print(f" Reranking Field: {match.document.reranking_field}")
        print("")
