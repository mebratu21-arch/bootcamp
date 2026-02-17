import { useState } from 'react';
import List from './components/List';
import { Book } from './types';
import './index.css';

const BookApp = () => {
  // State for books
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: '1984', author: 'George Orwell' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
  ]);

  // State for new book input
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  // Function to add a new book
  const addBook = () => {
    if (newTitle.trim() === '' || newAuthor.trim() === '') return;

    const newBook: Book = {
      id: Date.now(),
      title: newTitle,
      author: newAuthor,
    };

    setBooks([...books, newBook]);
    setNewTitle('');
    setNewAuthor('');
  };

  // Render function for the generic list
  const renderBook = (book: Book) => (
    <div className="book-item">
      <span className="book-title">{book.title}</span>
      <span className="book-author">by {book.author}</span>
    </div>
  );

  return (
    <div className="app-container">
      <h1>My Book List</h1>

      <div className="add-book-form">
        <input
          type="text"
          placeholder="Book Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
        <button onClick={addBook}>Add Book</button>
      </div>

      <List items={books} renderItem={renderBook} />
    </div>
  );
};

export default BookApp;
