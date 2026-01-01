import nltk
import numpy as np
import networkx as nx
from sentence_transformers import SentenceTransformer

nltk.download("punkt")

# ---------------------------------------------------------
# 1. Sentence Splitting
# ---------------------------------------------------------

def split_into_sentences(text):
    """Split an article into individual sentences."""
    return nltk.sent_tokenize(text)


# ---------------------------------------------------------
# 2. Embedding Model
# ---------------------------------------------------------

def load_embedding_model(model_name="all-MiniLM-L6-v2"):
    """Load a SentenceTransformer model for sentence embeddings."""
    return SentenceTransformer(model_name)


def embed_sentences(model, sentences):
    """Convert sentences into dense vector embeddings."""
    return model.encode(sentences, convert_to_numpy=True)


# ---------------------------------------------------------
# 3. Similarity Matrix
# ---------------------------------------------------------

def build_similarity_matrix(embeddings):
    """Compute cosine similarity matrix for sentence embeddings."""
    norm = embeddings / np.linalg.norm(embeddings, axis=1, keepdims=True)
    similarity_matrix = np.dot(norm, norm.T)
    return similarity_matrix


# ---------------------------------------------------------
# 4. Graph Construction + Ranking
# ---------------------------------------------------------

def rank_sentences(similarity_matrix):
    """Apply PageRank to the similarity graph."""
    graph = nx.from_numpy_array(similarity_matrix)
    scores = nx.pagerank(graph)
    return scores


# ---------------------------------------------------------
# 5. Generate Summary
# ---------------------------------------------------------

def summarize_articles(articles, top_k=5):
    """
    Given a list of article texts, return the top-ranked sentences.
    """
    # 1. Split all articles into sentences
    all_sentences = []
    for article in articles:
        all_sentences.extend(split_into_sentences(article))

    # 2. Load embedding model
    model = load_embedding_model()

    # 3. Embed sentences
    embeddings = embed_sentences(model, all_sentences)

    # 4. Build similarity matrix
    sim_matrix = build_similarity_matrix(embeddings)

    # 5. Rank sentences
    scores = rank_sentences(sim_matrix)

    # 6. Sort sentences by score
    ranked = sorted(
        ((scores[i], s) for i, s in enumerate(all_sentences)),
        reverse=True
    )

    # 7. Return top-k sentences
    summary = [sentence for _, sentence in ranked[:top_k]]
    return summary
