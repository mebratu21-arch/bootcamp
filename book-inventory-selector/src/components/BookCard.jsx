import React from 'react';

const BookCard = ({ book }) => {
  const getGenreColor = (genre) => {
    switch (genre) {
      case 'Horror':
        return 'genre-horror';
      case 'Fantasy':
        return 'genre-fantasy';
      case 'Science Fiction':
        return 'genre-scifi';
      default:
        return '';
    }
  };

  return (
    <div className="book-card">
      <div className={`genre-badge ${getGenreColor(book.genre)}`}>
        {book.genre}
      </div>
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">by {book.author}</p>
    </div>
  );
};

export default BookCard;
