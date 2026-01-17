import React from 'react';
import type { Book } from '../model/Book';
import { useBooks } from '../hooks/useBooks';
import './BookItem.css';

interface BookItemProps {
    book: Book;
}

export const BookItem: React.FC<BookItemProps> = ({ book }) => {
    const { removeBook, toggleReadStatus } = useBooks();

    return (
        <div className={`book-item ${book.isRead ? 'read' : ''}`}>
            <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">by {book.author}</p>
                <span className="category-tag">{book.category}</span>
            </div>
            <div className="book-actions">
                <button 
                    className={`status-btn ${book.isRead ? 'unread' : 'read'}`}
                    onClick={() => toggleReadStatus(book.id)}
                >
                    {book.isRead ? 'Mark Unread' : 'Mark Read'}
                </button>
                <button 
                    className="delete-btn"
                    onClick={() => removeBook(book.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};
