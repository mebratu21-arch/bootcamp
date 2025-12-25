let books = [
  { id: 1, title: "Clean Code", author: "Robert Martin", publishedYear: 2008 },
  { id: 2, title: "Eloquent JS", author: "Marijn Haverbeke", publishedYear: 2018 }
];

// READ ALL
exports.getBooks = (req, res) => {
  res.json(books);
};

// READ ONE
exports.getBook = (req, res) => {
  const book = books.find(b => b.id == req.params.bookId);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
};

// CREATE
exports.createBook = (req, res) => {
  const newBook = {
    id: books.length + 1,
    ...req.body
  };
  books.push(newBook);
  res.status(201).json(newBook);
};
