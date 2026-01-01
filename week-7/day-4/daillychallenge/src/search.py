def semantic_search(index, query_vector, top_k=5):
    """Run a semantic search and return sorted matches."""
    results = index.query(
        vector=[query_vector],
        top_k=top_k,
        include_metadata=True
    )

    matches = results.get("matches", [])
    matches = sorted(matches, key=lambda x: x["score"], reverse=True)
    return matches

def show_results(question, matches):
    """Pretty‑print search results."""
    print(f"Question: '{question}'\n")
    print("Results:")
    for i, match in enumerate(matches):
        print(f"{str(i+1).rjust(4)}. ID: {match['id']}")
        print(f" Score: {match['score']}")
        print(f" Metadata: {match['metadata']}")
        print("")
