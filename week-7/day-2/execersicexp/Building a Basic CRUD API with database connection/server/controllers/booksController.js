let books = require("../models/booksModel");

exports.getAllBooks = (req, res) => {
  res.json(books);
};

exports.getBookById = (req, res) => {
  const book = books.find((b) => b.id == req.params.bookId);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

exports.createBook = (req, res) => {
  const { title, author, publishedYear } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author,
    publishedYear,
  };
  books.push(newBook);
  res.status(201).json(newBook);
};
