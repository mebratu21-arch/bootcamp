const express = require('express');
const router = express.Router();

// In-memory database
let books = [];
let idCounter = 1;

// Get all books
router.get('/', (req, res) => {
  res.json(books);
});

// Add new book
router.post('/', (req, res) => {
  const newBook = {
    id: idCounter++,
    title: req.body.title,
    author: req.body.author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update book by ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) return res.status(404).json({ message: 'Book not found' });

  book.title = req.body.title ?? book.title;
  book.author = req.body.author ?? book.author;

  res.json(book);
});

// Delete book by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);
  res.json({ message: 'Book deleted' });
});

module.exports = router;
