import pandas as pd
from sentence_transformers import SentenceTransformer, InputExample

# -----------------------------
# Exercise 2: Vectorization
# -----------------------------

def example_create_fn(doc_title: str) -> InputExample:
    """
    Convert a title string into an InputExample.
    """
    return InputExample(guid=None, texts=[doc_title], label=0)


def prepare_examples(pdf_subset: pd.DataFrame):
    """Apply helper function to create InputExample list."""
    return pdf_subset.apply(lambda x: example_create_fn(x["title"]), axis=1).tolist()


def load_embedding_model(model_name="all-MiniLM-L6-v2"):
    """Load SentenceTransformer model."""
    return SentenceTransformer(model_name)


def generate_embeddings(model, titles_list):
    """Generate embeddings for a list of titles."""
    return model.encode(titles_list, convert_to_numpy=True)
