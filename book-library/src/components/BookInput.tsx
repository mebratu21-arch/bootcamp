import React, { useState } from 'react';
import { useBooks } from '../hooks/useBooks';
import './BookInput.css';

export const BookInput: React.FC = () => {
    const { addBook, checkBookExists } = useBooks();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!title.trim() || !author.trim()) {
            setError('Title and Author are required.');
            return;
        }

        if (checkBookExists(title)) {
            setError('A book with this title already exists.');
            return;
        }

        addBook(title, author, category || 'Uncategorized');
        setTitle('');
        setAuthor('');
        setCategory('');
    };

    return (
        <form className="book-input-form" onSubmit={handleSubmit}>
            <h2>Add New Book</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Book Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </div>
            <div className="form-group">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select Category</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Tech">Tech</option>
                </select>
            </div>
            <button type="submit">Add Book</button>
        </form>
    );
};
