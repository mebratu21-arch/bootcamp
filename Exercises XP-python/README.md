# RAG Pipeline - Python Exercises

A complete implementation of a Retrieval-Augmented Generation (RAG) pipeline using Python, demonstrating text vectorization, vector storage, similarity search, and LLM-based question answering.

## 📋 Project Overview

This project implements a RAG system that combines:
- **Sentence Transformers** for text vectorization
- **FAISS** for efficient similarity search
- **ChromaDB** for vector database management
- **Hugging Face Transformers** for question answering

## 🎯 Exercises

### Exercise 1: Data Loading and Preparation
- Load news dataset
- Add unique identifiers
- Create data subsets
- **File**: `exercise_1_data_loading.py`

### Exercise 2: Vectorization with Sentence Transformers
- Initialize embedding model (all-MiniLM-L6-v2)
- Generate text embeddings
- Verify embedding dimensions
- **File**: `exercise_2_vectorization.py`

### Exercise 3: FAISS Indexing and Search
- Build FAISS index for similarity search
- Normalize vectors for cosine similarity
- Implement search functionality
- **File**: `exercise_3_faiss_search.py`

### Exercise 4: ChromaDB Collection and Querying
- Set up ChromaDB client and collections
- Add documents with metadata
- Query vector database
- **File**: `exercise_4_chromadb.py`

### Exercise 5: Question Answering with Hugging Face
- Initialize GPT-2 model
- Retrieve relevant context
- Generate answers using LLM
- **File**: `exercise_5_qa_huggingface.py`

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
pip install -r requirements.txt
```

### Running Individual Exercises

```bash
# Exercise 1: Data Loading
python exercise_1_data_loading.py

# Exercise 2: Vectorization
python exercise_2_vectorization.py

# Exercise 3: FAISS Search
python exercise_3_faiss_search.py

# Exercise 4: ChromaDB
python exercise_4_chromadb.py

# Exercise 5: Q&A with Hugging Face
python exercise_5_qa_huggingface.py
```

### Running Complete Pipeline

```bash
python rag_pipeline_complete.py
```

## 📦 Project Structure

```
Exercises XP-python/
├── requirements.txt                    # Python dependencies
├── exercise_1_data_loading.py         # Data preparation
├── exercise_2_vectorization.py        # Text to embeddings
├── exercise_3_faiss_search.py         # Similarity search
├── exercise_4_chromadb.py              # Vector database
├── exercise_5_qa_huggingface.py       # Q&A system
├── rag_pipeline_complete.py           # Integrated pipeline
├── cache/                              # Cached data
│   ├── pdf_subset.csv
│   ├── faiss_title_embeddings.npy
│   └── titles_list.pkl
└── labelled_newscatcher_dataset.csv   # Dataset (auto-generated if missing)
```

## 🔧 Dependencies

- **faiss-cpu**: Similarity search and clustering
- **chromadb**: Vector database
- **sentence-transformers**: Text embedding models
- **transformers**: Hugging Face models
- **torch**: Deep learning framework
- **pandas**: Data manipulation
- **numpy**: Numerical computing

## 💡 Usage Examples

### Using the Complete Pipeline

```python
from rag_pipeline_complete import RAGPipeline

# Initialize pipeline
rag = RAGPipeline()

# Setup all components
rag.setup(n_samples=1000)

# Ask a question
result = rag.answer_question("What's the latest news on space exploration?")
print(result['answer'])
```

### Using Individual Components

```python
# FAISS Search
from exercise_3_faiss_search import search_content
results = search_content("climate", pdf_to_index, index, model, k=5)

# ChromaDB Query
from exercise_4_chromadb import query_collection
results = collection.query(query_texts=["technology"], n_results=10)

# Q&A System
from exercise_5_qa_huggingface import q_and_a
answer = q_and_a("Tell me about AI", collection, pipe)
```

## 🧪 Testing

Each exercise includes built-in tests:

1. **Exercise 1**: Verifies dataset loading and structure
2. **Exercise 2**: Checks embedding dimensions (384 for MiniLM-L6-v2)
3. **Exercise 3**: Tests FAISS search with sample queries
4. **Exercise 4**: Queries ChromaDB with multiple topics
5. **Exercise 5**: Generates answers for test questions

## 📊 Expected Output

### Exercise 1: Data Loading
```
✅ Cache directory created
✅ Dataset loaded: 1050 rows
📊 Dataset Shape: 1050 rows × 3 columns
```

### Exercise 2: Vectorization
```
🔮 Generating embeddings...
✅ Generated 1000 embeddings
   Dimension: 384
```

### Exercise 3: FAISS Search
```
🔍 Query: 'space'
📰 [0.8234] SpaceX launches new satellite into orbit
📰 [0.7891] International space station celebrates 25 years
```

### Exercise 4: ChromaDB
```
🗄️  ChromaDB ready with 100 documents
🔍 Retrieved 10 results for: 'climate'
```

### Exercise 5: Q&A
```
❓ Question: What's the latest news on space?
📚 Retrieved 5 context documents
💡 Generated answer based on context
```

## 🎓 Learning Objectives

By completing these exercises, you will learn:

1. **Text Vectorization**: Convert text to numerical representations
2. **Similarity Search**: Find semantically similar documents
3. **Vector Databases**: Store and query embeddings efficiently  
4. **RAG Architecture**: Combine retrieval and generation
5. **LLM Integration**: Use language models for Q&A

## 🔍 Key Concepts

### Retrieval-Augmented Generation (RAG)
RAG enhances LLM responses by:
1. Retrieving relevant documents based on the query
2. Using retrieved content as context
3. Generating informed answers with the LLM

### Embeddings
Dense vector representations that capture semantic meaning:
- Similar texts have similar embeddings
- Enable semantic search beyond keyword matching

### FAISS vs ChromaDB
- **FAISS**: Fast, lightweight, requires manual embedding
- **ChromaDB**: Full-featured, auto-embeds, includes metadata

## ⚙️ Configuration

Customize the pipeline by modifying parameters:

```python
# Change embedding model
rag = RAGPipeline(embedding_model="all-mpnet-base-v2")

# Use different LLM
rag = RAGPipeline(llm_model="gpt2-medium")

# Adjust dataset size
rag.setup(n_samples=5000)
```

## 🐛 Troubleshooting

**Issue**: Dependencies installation fails
```bash
# Try installing individually
pip install torch
pip install sentence-transformers
pip install faiss-cpu
pip install chromadb
pip install transformers
```

**Issue**: Out of memory
- Reduce `n_samples` parameter
- Use CPU instead of GPU
- Process data in smaller batches

**Issue**: Slow embedding generation
- Reduce dataset size
- Use a smaller embedding model
- Enable GPU acceleration

## 📚 References

- [Sentence Transformers Documentation](https://www.sbert.net/)
- [FAISS Documentation](https://github.com/facebookresearch/faiss)
- [ChromaDB Documentation](https://docs.trychroma.com/)
- [Hugging Face Transformers](https://huggingface.co/docs/transformers)

## 🎯 Next Steps

After completing these exercises:
1. Try different embedding models
2. Experiment with larger/custom datasets
3. Fine-tune the LLM for better answers
4. Add filtering and metadata search
5. Build a web interface with Flask/FastAPI

## 📝 License

Educational project for learning RAG pipelines.

---

🎉 **Happy Learning!** Build amazing AI-powered search and Q&A systems!
