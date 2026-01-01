import os
import numpy as np
import pandas as pd
import json

# -----------------------------
# Exercise 1: Data Loading & Prep
# -----------------------------

def install_dependencies():
    """
    Run this manually in terminal/Colab:
        pip install -q faiss-cpu==1.7.4
        pip install -q chromadb==0.3.21
        pip install -qU chromadb
        pip install -q numpy<2
        mkdir cache
        apt install libomp-dev
        python -m pip install --upgrade faiss-cpu
    """
    pass


def load_dataset(path: str) -> pd.DataFrame:
    """Load the CSV dataset into a pandas DataFrame."""
    pdf = pd.read_csv(path)
    return pdf


def add_identifier(pdf: pd.DataFrame) -> pd.DataFrame:
    """Add a unique ID column if missing."""
    pdf["id"] = pdf.index.astype(int)
    return pdf


def create_subset(pdf: pd.DataFrame, n: int = 1000) -> pd.DataFrame:
    """Return a smaller subset for faster experimentation."""
    return pdf.head(n)


def inspect(pdf: pd.DataFrame):
    """Display the DataFrame."""
    print(pdf.head())
    print("\nShape:", pdf.shape)
