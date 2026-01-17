import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Book, BooksState } from '../types';

// Load from localStorage
const loadBooksFromStorage = (): Book[] => {
  try {
    const data = localStorage.getItem('personal-library-books');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState: BooksState = {
  books: loadBooksFromStorage(),
  searchQuery: '',
  filterStatus: 'all'
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Omit<Book, 'id' | 'addedAt' | 'isRead'>>) => {
      const newBook: Book = {
        ...action.payload,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        isRead: false,
        addedAt: Date.now()
      };
      state.books.unshift(newBook);
      localStorage.setItem('personal-library-books', JSON.stringify(state.books));
    },
    
    removeBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter(book => book.id !== action.payload);
      localStorage.setItem('personal-library-books', JSON.stringify(state.books));
    },
    
    toggleRead: (state, action: PayloadAction<string>) => {
      const book = state.books.find(b => b.id === action.payload);
      if (book) {
        book.isRead = !book.isRead;
        localStorage.setItem('personal-library-books', JSON.stringify(state.books));
      }
    },
    
    updateBook: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
        localStorage.setItem('personal-library-books', JSON.stringify(state.books));
      }
    },
    
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    
    setFilterStatus: (state, action: PayloadAction<'all' | 'read' | 'unread'>) => {
      state.filterStatus = action.payload;
    }
  }
});

export const { 
  addBook, 
  removeBook, 
  toggleRead, 
  updateBook,
  setSearchQuery,
  setFilterStatus
} = bookSlice.actions;

export default bookSlice.reducer;
