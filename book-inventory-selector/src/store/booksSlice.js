import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [
    // Horror Books
    { id: 1, title: 'The Shining', author: 'Stephen King', genre: 'Horror' },
    { id: 2, title: 'Dracula', author: 'Bram Stoker', genre: 'Horror' },
    { id: 3, title: 'Frankenstein', author: 'Mary Shelley', genre: 'Horror' },
    { id: 4, title: 'The Haunting of Hill House', author: 'Shirley Jackson', genre: 'Horror' },
    { id: 5, title: 'It', author: 'Stephen King', genre: 'Horror' },
    
    // Fantasy Books
    { id: 6, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy' },
    { id: 7, title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', genre: 'Fantasy' },
    { id: 8, title: 'The Name of the Wind', author: 'Patrick Rothfuss', genre: 'Fantasy' },
    { id: 9, title: 'A Game of Thrones', author: 'George R.R. Martin', genre: 'Fantasy' },
    { id: 10, title: 'The Way of Kings', author: 'Brandon Sanderson', genre: 'Fantasy' },
    
    // Science Fiction Books
    { id: 11, title: 'Dune', author: 'Frank Herbert', genre: 'Science Fiction' },
    { id: 12, title: 'Foundation', author: 'Isaac Asimov', genre: 'Science Fiction' },
    { id: 13, title: 'Neuromancer', author: 'William Gibson', genre: 'Science Fiction' },
    { id: 14, title: 'The Martian', author: 'Andy Weir', genre: 'Science Fiction' },
    { id: 15, title: 'Ender\'s Game', author: 'Orson Scott Card', genre: 'Science Fiction' },
    { id: 16, title: 'Snow Crash', author: 'Neal Stephenson', genre: 'Science Fiction' },
  ],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
});

export default booksSlice.reducer;
