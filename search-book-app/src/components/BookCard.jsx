import React from 'react';

const BookCard = ({ image, title, author, published }) => {
  return (
    <div className="book-card">
      <img src={image} alt={title} />
      <div className="book-info">
        <h3>{title}</h3>
        <p><strong>Author:</strong> {author}</p>
        <p><strong>Published:</strong> {published}</p>
      </div>
    </div>
  );
};

export default BookCard;
