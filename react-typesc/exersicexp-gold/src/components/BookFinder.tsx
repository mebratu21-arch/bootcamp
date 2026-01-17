import { useState, useEffect } from 'react';
import { Book, ApiResponse } from '../types';

const BookFinder = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setBooks([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`);
        if (!response.ok) throw new Error('Failed to fetch books');
        const data: ApiResponse = await response.json();
        setBooks(data.docs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="exercise-section">
      <h2>Gold Exercise 1: Advanced Book Finder</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for books (e.g., 'The Hobbit')..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <p>Searching...</p>}
      {error && <p className="error">{error}</p>}

      <div className="book-grid">
        {books.map((book) => (
          <div key={book.key} className="book-card">
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
              />
            ) : (
              <div className="no-cover">No Cover</div>
            )}
            <h3>{book.title}</h3>
            <p>{book.author_name?.join(', ') || 'Unknown Author'}</p>
            <span>{book.first_publish_year}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookFinder;
