import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import BookList from './components/BookList';

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchField, setSearchField] = useState('Javascript');
  const [sort, setSort] = useState('Newest');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`);
      const data = await response.json();
      if (data.items) {
        setBooks(data.items);
      } else {
        setBooks([]);
      }
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(searchField);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(searchField);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const cleanData = (data) => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = a.volumeInfo.publishedDate || '0000';
      const dateB = b.volumeInfo.publishedDate || '0000';
      
      if (sort === 'Newest') {
        return dateB.localeCompare(dateA);
      } else if (sort === 'Oldest') {
        return dateA.localeCompare(dateB);
      }
      return 0;
    });
    return sortedData;
  };

  const sortedBooks = cleanData(books);

  return (
    <div>
      <Header />
      <div className="container">
        <SearchBox 
          searchField={searchField} 
          setSearchField={setSearchField} 
          handleSearch={handleSearch} 
          handleSort={handleSort}
          sort={sort}
        />
        {loading ? (
          <div className="message">Loading books...</div>
        ) : error ? (
          <div className="message">{error}</div>
        ) : (
          <BookList books={sortedBooks} />
        )}
      </div>
    </div>
  );
};

export default App;
