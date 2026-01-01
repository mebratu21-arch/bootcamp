// src/pages/Search.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Gallery from '../components/Gallery';
import { pexelsApi } from '../services/pexelsApi';

const Search = () => {
  const { query } = useParams();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query, currentPage]);

  const fetchSearchResults = async () => {
    setIsLoading(true);
    try {
      const data = await pexelsApi.searchPhotos(query, currentPage);
      setImages(data.photos);
      setTotalResults(data.total_results || 0);
    } catch (error) {
      console.error('Error searching photos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const decodedQuery = decodeURIComponent(query);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Search Results</h1>
        <p className="search-query">
          Showing results for: <span className="query-term">"{decodedQuery}"</span>
        </p>
      </div>

      <Gallery
        images={images}
        isLoading={isLoading}
        currentPage={currentPage}
        totalResults={totalResults}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Search;