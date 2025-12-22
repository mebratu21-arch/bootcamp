const express = require('express');
const app = express();

app.use(express.json());

// Import router
const booksRouter = require('./routes/books');

// Mount router
app.use('/books', booksRouter);

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
