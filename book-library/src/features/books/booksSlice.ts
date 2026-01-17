import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Book } from '../../model/Book';

interface BooksState {
  books: Book[];
  filter: 'all' | 'read' | 'unread';
}

const initialState: BooksState = {
  books: [],
  filter: 'all',
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    removeBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
    toggleReadStatus: (state, action: PayloadAction<string>) => {
      const book = state.books.find((b) => b.id === action.payload);
      if (book) {
        book.isRead = !book.isRead;
      }
    },
    setFilter: (state, action: PayloadAction<'all' | 'read' | 'unread'>) => {
      state.filter = action.payload;
    },
  },
});

export const { addBook, removeBook, toggleReadStatus, setFilter } = booksSlice.actions;
export default booksSlice.reducer;
