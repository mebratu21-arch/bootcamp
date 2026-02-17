import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectBooks,
  selectHorrorBooks,
  selectFantasyBooks,
  selectScienceFictionBooks,
} from '../store/selectors';
import BookCard from './BookCard';

const BookList = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');

  // Select appropriate books based on selected genre
  const allBooks = useSelector(selectBooks);
  const horrorBooks = useSelector(selectHorrorBooks);
  const fantasyBooks = useSelector(selectFantasyBooks);
  const sciFiBooks = useSelector(selectScienceFictionBooks);

  // Determine which books to display
  const displayBooks = () => {
    switch (selectedGenre) {
      case 'Horror':
        return horrorBooks;
      case 'Fantasy':
        return fantasyBooks;
      case 'Science Fiction':
        return sciFiBooks;
      default:
        return allBooks;
    }
  };

  const books = displayBooks();
  const genres = ['All', 'Horror', 'Fantasy', 'Science Fiction'];

  return (
    <div className="book-list-container">
      <header className="header">
        <h1>📚 Book Inventory Selector</h1>
        <p className="subtitle">Explore our collection by genre</p>
      </header>

      <div className="genre-filter">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`genre-button ${selectedGenre === genre ? 'active' : ''}`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="book-count">
        Showing <span className="count-highlight">{books.length}</span> books
        {selectedGenre !== 'All' && (
          <span className="genre-label"> in {selectedGenre}</span>
        )}
      </div>

      <div className="books-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
