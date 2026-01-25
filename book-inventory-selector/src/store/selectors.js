import { createSelector } from '@reduxjs/toolkit';

// Base selector - gets all books from state
export const selectBooks = (state) => state.books.books;

// Memoized selector for Horror books
export const selectHorrorBooks = createSelector(
  [selectBooks],
  (books) => books.filter(book => book.genre === 'Horror')
);

// Memoized selector for Fantasy books
export const selectFantasyBooks = createSelector(
  [selectBooks],
  (books) => books.filter(book => book.genre === 'Fantasy')
);

// Memoized selector for Science Fiction books
export const selectScienceFictionBooks = createSelector(
  [selectBooks],
  (books) => books.filter(book => book.genre === 'Science Fiction')
);
