import React from 'react';
import { useBooks } from '../hooks/useBooks';
import { BookItem } from './BookItem';
import './BookList.css';

export const BookList: React.FC = () => {
    const { books, filter, setFilter } = useBooks();

    return (
        <div className="book-list-container">
            <div className="filter-controls">
                <button 
                    className={filter === 'all' ? 'active' : ''} 
                    onClick={() => setFilter('all')}
                >
                    All Books
                </button>
                <button 
                    className={filter === 'read' ? 'active' : ''} 
                    onClick={() => setFilter('read')}
                >
                    Read
                </button>
                <button 
                    className={filter === 'unread' ? 'active' : ''} 
                    onClick={() => setFilter('unread')}
                >
                    Unread
                </button>
            </div>

            {books.length === 0 ? (
                <div className="empty-state">
                    No books found. Start by adding some to your library!
                </div>
            ) : (
                <div className="book-grid">
                    {books.map((book) => (
                        <BookItem key={book.id} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
};
