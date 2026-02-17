import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books }) => {
  if (books.length === 0) {
    return <div className="message">No books found. Try a different search!</div>;
  }

  return (
    <div className="book-list">
      {books.map((book, i) => (
        <BookCard 
          key={book.id || i}
          image={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150x200?text=No+Cover'}
          title={book.volumeInfo.title}
          author={book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}
          published={book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate.substring(0, 4) : 'N/A'}
        />
      ))}
    </div>
  );
};

export default BookList;
