import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addBook, removeBook, toggleRead, setSearchQuery, setFilterStatus } from '../store/bookSlice';

export const useBooks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, searchQuery, filterStatus } = useSelector((state: RootState) => state.books);

  // Filter books based on search and filter status
  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' ? true :
      filterStatus === 'read' ? book.isRead :
      !book.isRead;
    
    return matchesSearch && matchesFilter;
  });

  return {
    books: filteredBooks,
    allBooks: books,
    searchQuery,
    filterStatus,
    addBook: (book: { title: string; author: string; genre: string }) => dispatch(addBook(book)),
    removeBook: (id: string) => dispatch(removeBook(id)),
    toggleRead: (id: string) => dispatch(toggleRead(id)),
    setSearchQuery: (query: string) => dispatch(setSearchQuery(query)),
    setFilterStatus: (status: 'all' | 'read' | 'unread') => dispatch(setFilterStatus(status))
  };
};
