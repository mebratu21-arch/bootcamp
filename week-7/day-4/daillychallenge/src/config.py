# Configuration settings for Pinecone + Reranking project

# Pinecone environment
CLOUD = "aws"
REGION = "us-east-1"

# Index settings
INDEX_NAME = "medical-notes-index"

# Embedding model
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

# Reranking model
RERANK_MODEL = "bge-reranker-v2-m3"
