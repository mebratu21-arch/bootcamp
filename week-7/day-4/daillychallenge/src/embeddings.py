import torch
from transformers import AutoTokenizer, AutoModel
from .config import EMBEDDING_MODEL

# Load model once at import time
tokenizer = AutoTokenizer.from_pretrained(EMBEDDING_MODEL)
model = AutoModel.from_pretrained(EMBEDDING_MODEL)

def get_embedding(text: str):
    """Generate a 384‑dim embedding for a given text."""
    encoded = tokenizer(text, padding=True, truncation=True, return_tensors="pt")
    with torch.no_grad():
        output = model(**encoded)
        embedding = output.last_hidden_state[0].mean(dim=0)  # average over sequence length
    return embedding.numpy().tolist()
