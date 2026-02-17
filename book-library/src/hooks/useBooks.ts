import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { addBook, removeBook, toggleReadStatus, setFilter } from '../features/books/booksSlice';
import { BookItem } from '../model/Book';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useBooks = () => {
    const dispatch = useAppDispatch();
    const books = useAppSelector((state) => {
        const { books, filter } = state.books;
        if (filter === 'all') return books;
        if (filter === 'read') return books.filter((b) => b.isRead);
        if (filter === 'unread') return books.filter((b) => !b.isRead);
        return books;
    });
    
    const filter = useAppSelector((state) => state.books.filter);

    const checkBookExists = (title: string) => {
        return books.some(b => b.title.toLowerCase() === title.toLowerCase());
    };

    const addNewBook = (title: string, author: string, category: string) => {
        if (!title.trim() || !author.trim()) return;
        
        const newBook = new BookItem(
            Date.now().toString(),
            title,
            author,
            category
        ).toJSON(); // Convert back to plain object for Redux

        dispatch(addBook(newBook));
    };

    const removeBookById = (id: string) => {
        dispatch(removeBook(id));
    };

    const toggleBookRead = (id: string) => {
        dispatch(toggleReadStatus(id));
    };

    const setBookFilter = (filter: 'all' | 'read' | 'unread') => {
        dispatch(setFilter(filter));
    };

    return {
        books,
        filter,
        addBook: addNewBook,
        removeBook: removeBookById,
        toggleReadStatus: toggleBookRead,
        setFilter: setBookFilter,
        checkBookExists
    };
};
