# ============================
# Text Summarization with GloVe and PageRank
# ============================

import numpy as np
import pandas as pd
import nltk
import re
import requests
import zipfile
import io
import os
from collections import defaultdict
from scipy import spatial
from sklearn.metrics.pairwise import cosine_similarity

# Download NLTK resources
print("Downloading NLTK resources...")
try:
    nltk.download('punkt', quiet=True)
    nltk.download('stopwords', quiet=True)
except:
    pass

from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords

# ============================
# 1. TEXT CLEANING
# ============================

class TextPreprocessor:
    """Handles tokenization, lowercasing, and stopword removal."""
    
    def __init__(self):
        self.stop_words = set(stopwords.words('english'))
        # Add custom stopwords for tennis/sports articles
        self.stop_words.update(['tennis', 'game', 'match', 'player', 'players', 'said'])
        
    def clean_sentence(self, sentence):
        """Clean individual sentence."""
        # Convert to lowercase
        sentence = sentence.lower()
        
        # Remove special characters and digits
        sentence = re.sub(r'[^a-zA-Z\s]', '', sentence)
        
        # Tokenize
        tokens = word_tokenize(sentence)
        
        # Remove stopwords and short words
        cleaned_tokens = [word for word in tokens if word not in self.stop_words and len(word) > 2]
        
        return cleaned_tokens
    
    def preprocess_text(self, text):
        """Preprocess entire text: split into sentences and clean each."""
        # Split into sentences
        sentences = sent_tokenize(text)
        
        # Clean each sentence
        cleaned_sentences = []
        original_sentences = []
        
        for sent in sentences:
            if len(sent.strip()) > 20:  # Ignore very short sentences
                cleaned_tokens = self.clean_sentence(sent)
                if cleaned_tokens:  # Only keep sentences with content
                    cleaned_sentences.append(cleaned_tokens)
                    original_sentences.append(sent.strip())
        
        return original_sentences, cleaned_sentences

# ============================
# 2. GLOVE EMBEDDINGS
# ============================

class GloVeEmbeddings:
    """Loads GloVe embeddings and provides sentence vectorization."""
    
    def __init__(self, embedding_dim=100):
        self.embedding_dim = embedding_dim
        self.glove_vectors = {}
        self.load_glove_embeddings()
        
    def download_glove(self):
        """Download GloVe embeddings if not available locally."""
        print("Downloading GloVe embeddings...")
        url = "http://nlp.stanford.edu/data/glove.6B.zip"
        
        try:
            response = requests.get(url, stream=True)
            response.raise_for_status()
            
            with zipfile.ZipFile(io.BytesIO(response.content)) as z:
                # Extract the 100d embeddings
                glove_file = f"glove.6B.{self.embedding_dim}d.txt"
                with z.open(glove_file) as f:
                    return f.read().decode('utf-8')
                    
        except Exception as e:
            print(f"Error downloading GloVe: {e}")
            return None
    
    def load_glove_embeddings(self):
        """Load GloVe embeddings into memory."""
        print(f"Loading GloVe embeddings ({self.embedding_dim} dimensions)...")
        
        # Try to load from local file first
        glove_path = f"glove.6B.{self.embedding_dim}d.txt"
        
        if not os.path.exists(glove_path):
            print("GloVe file not found locally. Attempting to download...")
            glove_data = self.download_glove()
            if glove_data:
                lines = glove_data.split('\n')
            else:
                print("Using smaller vocabulary for demonstration...")
                self._create_demo_embeddings()
                return
        else:
            with open(glove_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
        
        # Parse embeddings
        self.glove_vectors = {}
        for line in lines:
            if line.strip():
                values = line.split()
                word = values[0]
                vector = np.asarray(values[1:], dtype='float32')
                if len(vector) == self.embedding_dim:
                    self.glove_vectors[word] = vector
        
        print(f"Loaded {len(self.glove_vectors)} word vectors")
        
    def _create_demo_embeddings(self):
        """Create demo embeddings for testing if GloVe can't be loaded."""
        print("Creating demo embeddings for testing...")
        demo_words = ['tennis', 'player', 'match', 'tournament', 'serve', 
                     'point', 'court', 'grand', 'slam', 'champion']
        
        np.random.seed(42)
        for word in demo_words:
            self.glove_vectors[word] = np.random.randn(self.embedding_dim)
        
        # Add some related words with similar vectors
        for word in ['game', 'competition', 'athlete']:
            self.glove_vectors[word] = self.glove_vectors['match'] + np.random.randn(self.embedding_dim) * 0.1
    
    def get_word_vector(self, word):
        """Get vector for a single word."""
        return self.glove_vectors.get(word, np.zeros(self.embedding_dim))
    
    def get_sentence_vector(self, sentence_tokens):
        """Convert sentence to vector by averaging word vectors."""
        if not sentence_tokens:
            return np.zeros(self.embedding_dim)
        
        vectors = []
        for word in sentence_tokens:
            vec = self.get_word_vector(word)
            # Only add non-zero vectors
            if np.any(vec):
                vectors.append(vec)
        
        if vectors:
            return np.mean(vectors, axis=0)
        else:
            return np.zeros(self.embedding_dim)

# ============================
# 3. SIMILARITY MATRIX & PAGERANK
# ============================

class TextRankSummarizer:
    """Implements TextRank algorithm for extractive summarization."""
    
    def __init__(self, similarity_threshold=0.1, damping_factor=0.85, max_iter=100):
        self.similarity_threshold = similarity_threshold
        self.damping_factor = damping_factor
        self.max_iter = max_iter
        
    def build_similarity_matrix(self, sentence_vectors):
        """Build cosine similarity matrix between sentences."""
        n = len(sentence_vectors)
        similarity_matrix = np.zeros((n, n))
        
        for i in range(n):
            for j in range(n):
                if i != j:
                    # Calculate cosine similarity
                    cos_sim = 1 - spatial.distance.cosine(
                        sentence_vectors[i], 
                        sentence_vectors[j]
                    )
                    
                    # Only keep similarities above threshold
                    if cos_sim > self.similarity_threshold:
                        similarity_matrix[i][j] = cos_sim
        
        # Normalize the matrix
        for i in range(n):
            row_sum = similarity_matrix[i].sum()
            if row_sum > 0:
                similarity_matrix[i] /= row_sum
        
        return similarity_matrix
    
    def pagerank(self, similarity_matrix):
        """Calculate PageRank scores for sentences."""
        n = len(similarity_matrix)
        
        # Initialize with equal scores
        scores = np.ones(n) / n
        
        # Personalization vector (uniform)
        personalization = np.ones(n) / n
        
        # Power iteration
        for _ in range(self.max_iter):
            prev_scores = scores.copy()
            
            # PageRank formula: (1-d) * personalization + d * M^T * scores
            scores = (1 - self.damping_factor) * personalization + \
                    self.damping_factor * np.dot(similarity_matrix.T, scores)
            
            # Check for convergence
            if np.linalg.norm(scores - prev_scores) < 1e-6:
                break
        
        return scores
    
    def summarize(self, original_sentences, cleaned_sentences, embeddings, num_sentences=3):
        """Generate summary using TextRank algorithm."""
        # Convert sentences to vectors
        print("Converting sentences to vectors...")
        sentence_vectors = []
        for tokens in cleaned_sentences:
            vec = embeddings.get_sentence_vector(tokens)
            sentence_vectors.append(vec)
        
        # Build similarity matrix
        print("Building similarity matrix...")
        similarity_matrix = self.build_similarity_matrix(sentence_vectors)
        
        # Calculate PageRank scores
        print("Calculating PageRank scores...")
        scores = self.pagerank(similarity_matrix)
        
        # Rank sentences by score
        ranked_sentences = []
        for i, score in enumerate(scores):
            ranked_sentences.append({
                'index': i,
                'score': score,
                'sentence': original_sentences[i],
                'tokens': cleaned_sentences[i]
            })
        
        # Sort by score (descending)
        ranked_sentences.sort(key=lambda x: x['score'], reverse=True)
        
        # Select top sentences (maintaining original order for coherence)
        top_indices = [s['index'] for s in ranked_sentences[:num_sentences]]
        top_indices.sort()  # Sort to maintain original order
        
        # Build summary
        summary = [original_sentences[i] for i in top_indices]
        
        return summary, ranked_sentences, similarity_matrix, scores

# ============================
# 4. COMPLETE SUMMARIZATION PIPELINE
# ============================

class GraphBasedSummarizer:
    """Complete pipeline for graph-based text summarization."""
    
    def __init__(self, embedding_dim=100):
        self.preprocessor = TextPreprocessor()
        self.embeddings = GloVeEmbeddings(embedding_dim)
        self.textrank = TextRankSummarizer()
        
    def process_articles(self, articles, num_sentences=3):
        """Process multiple articles and generate summaries."""
        all_summaries = []
        all_details = []
        
        for i, article in enumerate(articles):
            print(f"\n{'='*60}")
            print(f"Processing Article {i+1}/{len(articles)}")
            print(f"{'='*60}")
            
            # Preprocess text
            print("Preprocessing text...")
            original_sentences, cleaned_sentences = self.preprocessor.preprocess_text(article)
            
            if len(original_sentences) < num_sentences:
                print(f"Warning: Article {i+1} has only {len(original_sentences)} sentences.")
                summary = original_sentences
                details = None
            else:
                # Generate summary
                summary, ranked_sentences, sim_matrix, scores = self.textrank.summarize(
                    original_sentences, cleaned_sentences, self.embeddings, num_sentences
                )
                
                # Store details for analysis
                details = {
                    'ranked_sentences': ranked_sentences,
                    'similarity_matrix': sim_matrix,
                    'scores': scores
                }
            
            all_summaries.append(summary)
            all_details.append(details)
            
            # Print summary
            print(f"\nSummary for Article {i+1}:")
            print("-" * 40)
            for j, sent in enumerate(summary):
                print(f"{j+1}. {sent}")
            print()
        
        return all_summaries, all_details

# ============================
# 5. EXAMPLE TENNIS ARTICLES & DEMONSTRATION
# ============================

def load_tennis_articles():
    """Load example tennis articles for demonstration."""
    
    articles = [
        """Rafael Nadal won his 14th French Open title on Sunday, defeating Casper Ruud in straight sets. 
        The Spanish tennis star demonstrated his dominance on clay courts once again. Nadal's victory 
        solidifies his position as the greatest clay-court player in history. The match lasted three hours 
        and showcased Nadal's exceptional stamina and skill. This win marks his 22nd Grand Slam title, 
        extending his lead in the all-time men's standings. Thousands of fans cheered as Nadal lifted 
        the trophy at Roland Garros. His performance throughout the tournament was nothing short of 
        spectacular, dropping only three sets total. Nadal expressed gratitude to his team and fans 
        during the emotional award ceremony.""",
        
        """Novak Djokovic claimed his seventh Wimbledon championship after an intense final against Nick Kyrgios. 
        The Serbian champion showed remarkable resilience, coming back after losing the first set. 
        Djokovic's serve was particularly effective, with 15 aces throughout the match. This victory 
        brings Djokovic closer to Nadal's Grand Slam record. The atmosphere at Centre Court was electric 
        as spectators witnessed tennis history. Djokovic praised Kyrgios for his competitive spirit 
        and exceptional talent. The match featured several breathtaking rallies that had fans on the 
        edge of their seats. With this win, Djokovic continues to prove why he's considered one of the 
        greatest athletes in tennis history.""",
        
        """Carlos Alcaraz, the young Spanish sensation, won his first US Open title in a thrilling five-set match. 
        At just 19 years old, Alcaraz becomes the youngest world number one in ATP history. His match 
        against Casper Ruud lasted nearly four hours, with both players displaying incredible athleticism. 
        Alcaraz's aggressive baseline play and powerful forehand were key to his victory. This triumph 
        marks a changing of the guard in men's tennis, with the new generation making its mark. 
        Alcaraz dedicated his win to his family and coaches who supported him throughout his journey. 
        The tennis world is excited to see what the future holds for this promising young champion."""
    ]
    
    return articles

def analyze_results(summaries, details):
    """Analyze and display summarization results."""
    
    print("\n" + "="*60)
    print("ANALYSIS OF SUMMARIZATION RESULTS")
    print("="*60)
    
    for i, (summary, detail) in enumerate(zip(summaries, details)):
        if detail:
            print(f"\nArticle {i+1} Analysis:")
            print("-" * 40)
            
            # Show top sentences with scores
            print("Top ranked sentences:")
            for j, sent_info in enumerate(detail['ranked_sentences'][:5]):
                print(f"{j+1}. Score: {sent_info['score']:.4f}")
                print(f"   Sentence: {sent_info['sentence'][:80]}...")
            
            # Show similarity matrix shape
            print(f"\nSimilarity matrix shape: {detail['similarity_matrix'].shape}")
            
            # Show score distribution
            scores = detail['scores']
            print(f"Score range: {scores.min():.6f} - {scores.max():.6f}")
            print(f"Mean score: {scores.mean():.6f}")
            print(f"Selected sentences indices: {[detail['ranked_sentences'][j]['index'] for j in range(len(summary))]}")

# ============================
# 6. MAIN EXECUTION
# ============================

def main():
    """Main execution function."""
    print("="*60)
    print("GRAPH-BASED TEXT SUMMARIZER")
    print("="*60)
    print("Implementing: Text cleaning, GloVe embeddings, Cosine similarity,")
    print("PageRank ranking, and Extractive summarization")
    print("="*60)
    
    # Initialize summarizer
    print("\nInitializing summarizer...")
    summarizer = GraphBasedSummarizer(embedding_dim=100)
    
    # Load tennis articles
    print("\nLoading tennis articles...")
    articles = load_tennis_articles()
    print(f"Loaded {len(articles)} articles")
    
    # Generate summaries
    num_summary_sentences = 3
    summaries, details = summarizer.process_articles(
        articles, 
        num_sentences=num_summary_sentences
    )
    
    # Analyze results
    analyze_results(summaries, details)
    
    # Display final summaries
    print("\n" + "="*60)
    print("FINAL SUMMARIES")
    print("="*60)
    
    for i, summary in enumerate(summaries):
        print(f"\nArticle {i+1} Summary ({len(summary)} sentences):")
        print("-" * 40)
        for j, sentence in enumerate(summary):
            print(f"{j+1}. {sentence}")
    
    return summaries, details

# ============================
# 7. UTILITY FUNCTIONS
# ============================

def evaluate_summary_coverage(original_text, summary):
    """Evaluate how much of the original text is covered by the summary."""
    # Simple evaluation based on word coverage
    original_words = set(word_tokenize(original_text.lower()))
    summary_words = set()
    
    for sentence in summary:
        summary_words.update(word_tokenize(sentence.lower()))
    
    # Remove stopwords for better evaluation
    stop_words = set(stopwords.words('english'))
    original_words = {w for w in original_words if w not in stop_words and len(w) > 2}
    summary_words = {w for w in summary_words if w not in stop_words and len(w) > 2}
    
    if original_words:
        coverage = len(summary_words.intersection(original_words)) / len(original_words)
        return coverage
    return 0

def export_results(summaries, filename="summaries.txt"):
    """Export summaries to a text file."""
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("GRAPH-BASED TEXT SUMMARIES\n")
        f.write("=" * 50 + "\n\n")
        
        for i, summary in enumerate(summaries):
            f.write(f"ARTICLE {i+1} SUMMARY:\n")
            f.write("-" * 40 + "\n")
            for j, sentence in enumerate(summary):
                f.write(f"{j+1}. {sentence}\n")
            f.write("\n")
    
    print(f"\nSummaries exported to {filename}")

# ============================
# RUN THE SUMMARIZER
# ============================

if __name__ == "__main__":
    # Run the main summarizer
    summaries, details = main()
    
    # Additional analysis
    print("\n" + "="*60)
    print("ADDITIONAL ANALYSIS")
    print("="*60)
    
    # Load articles again for evaluation
    articles = load_tennis_articles()
    
    for i, (article, summary) in enumerate(zip(articles, summaries)):
        coverage = evaluate_summary_coverage(article, summary)
        print(f"\nArticle {i+1}:")
        print(f"  Original sentences: {len(sent_tokenize(article))}")
        print(f"  Summary sentences: {len(summary)}")
        print(f"  Word coverage: {coverage:.2%}")
        print(f"  Compression ratio: {len(summary)/len(sent_tokenize(article)):.2%}")
    
    # Export results
    export_results(summaries)
    
    print("\n" + "="*60)
    print("SUMMARIZATION COMPLETE!")
    print("="*60)