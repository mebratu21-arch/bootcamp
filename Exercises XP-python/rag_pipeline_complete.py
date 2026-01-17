"""
Complete RAG Pipeline - End-to-End Implementation
==================================================
This script integrates all exercises into a single, cohesive RAG pipeline.
"""

import numpy as np
import pandas as pd
import faiss
import json
import torch
from pathlib import Path
from sentence_transformers import SentenceTransformer
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
import chromadb

class RAGPipeline:
    """
    Complete Retrieval-Augmented Generation Pipeline.
    
    This class integrates:
    - Data loading and preparation
    - Text vectorization with Sentence Transformers
    - FAISS indexing for similarity search
    - ChromaDB for vector storage
    - LLM-based question answering with Hugging Face
    """
    
    def __init__(self, 
                 data_path="labelled_newscatcher_dataset.csv",
                 embedding_model="all-MiniLM-L6-v2",
                 llm_model="gpt2",
                 cache_dir="cache"):
        """
        Initialize the RAG pipeline.
        
        Args:
            data_path (str): Path to CSV dataset
            embedding_model (str): Sentence Transformer model name
            llm_model (str): Hugging Face LLM model name
            cache_dir (str): Directory for caching data
        """
        self.data_path = data_path
        self.embedding_model_name = embedding_model
        self.llm_model_name = llm_model
        self.cache_dir = Path(cache_dir)
        self.cache_dir.mkdir(exist_ok=True)
        
        # Components
        self.df = None
        self.embedding_model = None
        self.embeddings = None
        self.faiss_index = None
        self.chroma_collection = None
        self.llm_pipe = None
        
        print("🚀 RAG Pipeline initialized!")
    
    def load_data(self, n_samples=1000):
        """Load and prepare dataset."""
        print("\n📂 Loading data...")
        
        if not Path(self.data_path).exists():
            print("⚠️  Dataset not found. Creating sample dataset...")
            self._create_sample_dataset()
        
        self.df = pd.read_csv(self.data_path)
        
        # Add ID if not present
        if 'id' not in self.df.columns:
            self.df['id'] = range(len(self.df))
        
        # Create subset
        self.df = self.df.head(n_samples)
        
        print(f"✅ Loaded {len(self.df)} documents")
        print(f"   Columns: {list(self.df.columns)}")
        
        return self.df
    
    def _create_sample_dataset(self):
        """Create sample news dataset."""
        sample_data = {
            'title': [
                'SpaceX launches new satellite into orbit',
                'Climate change affects global weather patterns',
                'New AI model breaks language understanding records',
                'Stock market reaches all-time high',
                'Scientists discover new species in Amazon rainforest',
            ] * 200,
            'topic': [
                'SCIENCE', 'ENVIRONMENT', 'TECHNOLOGY', 'BUSINESS', 'SCIENCE'
            ] * 200
        }
        df = pd.DataFrame(sample_data)
        df.to_csv(self.data_path, index=False)
        print(f"✅ Sample dataset created: {self.data_path}")
    
    def generate_embeddings(self):
        """Generate embeddings using Sentence Transformers."""
        print("\n🔮 Generating embeddings...")
        
        # Load model
        self.embedding_model = SentenceTransformer(self.embedding_model_name)
        
        # Generate embeddings
        titles = self.df['title'].tolist()
        self.embeddings = self.embedding_model.encode(
            titles,
            show_progress_bar=True,
            convert_to_numpy=True
        )
        
        print(f"✅ Generated {len(self.embeddings)} embeddings")
        print(f"   Dimension: {self.embeddings.shape[1]}")
        
        return self.embeddings
    
    def build_faiss_index(self):
        """Build FAISS index for similarity search."""
        print("\n🏗️  Building FAISS index...")
        
        # Normalize embeddings
        embeddings_normalized = self.embeddings.copy().astype('float32')
        faiss.normalize_L2(embeddings_normalized)
        
        # Create index
        dim = embeddings_normalized.shape[1]
        base_index = faiss.IndexFlatIP(dim)
        self.faiss_index = faiss.IndexIDMap(base_index)
        
        # Add vectors with IDs
        ids = np.array(self.df['id'].values, dtype=np.int64)
        self.faiss_index.add_with_ids(embeddings_normalized, ids)
        
        print(f"✅ FAISS index built with {self.faiss_index.ntotal} vectors")
        
        return self.faiss_index
    
    def setup_chromadb(self):
        """Set up ChromaDB collection."""
        print("\n🗄️  Setting up ChromaDB...")
        
        client = chromadb.Client()
        
        # Delete existing collection
        collections = client.list_collections()
        if collections and "rag_news" in [c.name for c in collections]:
            client.delete_collection("rag_news")
        
        # Create new collection
        self.chroma_collection = client.create_collection("rag_news")
        
        # Add documents
        self.chroma_collection.add(
            documents=self.df['title'].tolist(),
            metadatas=[{"topic": t} for t in self.df['topic'].tolist()],
            ids=[f"id_{i}" for i in range(len(self.df))]
        )
        
        print(f"✅ ChromaDB ready with {self.chroma_collection.count()} documents")
        
        return self.chroma_collection
    
    def initialize_llm(self):
        """Initialize LLM for question answering."""
        print(f"\n🤖 Loading LLM: {self.llm_model_name}...")
        
        tokenizer = AutoTokenizer.from_pretrained(self.llm_model_name)
        model = AutoModelForCausalLM.from_pretrained(self.llm_model_name)
        
        if tokenizer.pad_token is None:
            tokenizer.pad_token = tokenizer.eos_token
        
        device = 0 if torch.cuda.is_available() else -1
        self.llm_pipe = pipeline(
            "text-generation",
            model=model,
            tokenizer=tokenizer,
            max_new_tokens=200,
            device=device,
            pad_token_id=tokenizer.eos_token_id
        )
        
        print(f"✅ LLM ready on {'GPU' if device == 0 else 'CPU'}")
        
        return self.llm_pipe
    
    def search_faiss(self, query, k=5):
        """Search using FAISS index."""
        # Encode query
        query_vec = self.embedding_model.encode([query], convert_to_numpy=True).astype('float32')
        faiss.normalize_L2(query_vec)
        
        # Search
        similarities, ids = self.faiss_index.search(query_vec, k)
        
        # Get results
        results = self.df[self.df['id'].isin(ids[0])].copy()
        id_to_sim = dict(zip(ids[0], similarities[0]))
        results['similarity'] = results['id'].map(id_to_sim)
        results = results.sort_values('similarity', ascending=False)
        
        return results
    
    def search_chromadb(self, query, k=5):
        """Search using ChromaDB."""
        results = self.chroma_collection.query(
            query_texts=[query],
            n_results=k
        )
        return results
    
    def answer_question(self, question, n_context=5, use_chromadb=True):
        """
        Complete Q&A pipeline.
        
        Args:
            question (str): User's question
            n_context (int): Number of context documents
            use_chromadb (bool): Use ChromaDB (True) or FAISS (False)
        
        Returns:
            dict: Answer and metadata
        """
        print(f"\n❓ Question: {question}")
        print("─"*60)
        
        # Retrieve context
        if use_chromadb:
            results = self.search_chromadb(question, k=n_context)
            documents = results['documents'][0]
        else:
            results = self.search_faiss(question, k=n_context)
            documents = results['title'].tolist()
        
        print(f"📚 Retrieved {len(documents)} context documents")
        
        # Construct prompt
        context = " ".join([f"#{i+1}: {doc}" for i, doc in enumerate(documents)])
        prompt = f"""Context: {context}

Question: {question}

Answer:"""
        
        # Generate answer
        print("🧠 Generating answer...")
        response = self.llm_pipe(prompt, do_sample=True, temperature=0.7)[0]['generated_text']
        
        return {
            'question': question,
            'context': documents,
            'prompt': prompt,
            'answer': response
        }
    
    def setup(self, n_samples=1000):
        """Complete setup of the RAG pipeline."""
        print("\n" + "="*60)
        print("⚡ SETTING UP COMPLETE RAG PIPELINE")
        print("="*60)
        
        self.load_data(n_samples)
        self.generate_embeddings()
        self.build_faiss_index()
        self.setup_chromadb()
        self.initialize_llm()
        
        print("\n" + "="*60)
        print("✅ RAG PIPELINE READY!")
        print("="*60)
        print("\n📋 Pipeline Components:")
        print(f"  ✓ Dataset: {len(self.df)} documents")
        print(f"  ✓ Embeddings: {self.embeddings.shape}")
        print(f"  ✓ FAISS Index: {self.faiss_index.ntotal} vectors")
        print(f"  ✓ ChromaDB: {self.chroma_collection.count()} documents")
        print(f"  ✓ LLM: {self.llm_model_name}")
        
        return self

def main():
    """Demonstration of complete RAG pipeline."""
    # Initialize pipeline
    rag = RAGPipeline()
    
    # Setup all components
    rag.setup(n_samples=500)
    
    # Test questions
    test_questions = [
        "What's the latest news on space?",
        "Tell me about climate change",
        "What are recent technology developments?"
    ]
    
    print("\n" + "="*60)
    print("🧪 TESTING Q&A SYSTEM")
    print("="*60)
    
    for question in test_questions:
        result = rag.answer_question(question, n_context=3)
        
        print(f"\n💡 ANSWER:")
        print(result['answer'])
        print("\n" + "─"*60)
    
    return rag

if __name__ == "__main__":
    rag_pipeline = main()
    
    print("\n🎯 Pipeline is ready! You can now ask questions:")
    print("  rag_pipeline.answer_question('your question here')")
