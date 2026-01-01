// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import Gallery from '../components/Gallery';
import { pexelsApi } from '../services/pexelsApi';

const Home = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    fetchCuratedPhotos();
  }, [currentPage]);

  const fetchCuratedPhotos = async () => {
    setIsLoading(true);
    try {
      const data = await pexelsApi.getCuratedPhotos(currentPage);
      setImages(data.photos);
      setTotalResults(data.total_results || 0);
    } catch (error) {
      console.error('Error fetching curated photos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="page">
      <div className="hero-section">
        <h1>Welcome to Snap Shot</h1>
        <p className="subtitle">Discover amazing free stock photos from talented photographers worldwide</p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">{totalResults.toLocaleString()}+</span>
            <span className="stat-label">Total Images</span>
          </div>
          <div className="stat">
            <span className="stat-number">1000+</span>
            <span className="stat-label">Photographers</span>
          </div>
          <div className="stat">
            <span className="stat-number">50+</span>
            <span className="stat-label">Categories</span>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Featured Photos</h2>
        <Gallery
          images={images}
          isLoading={isLoading}
          currentPage={currentPage}
          totalResults={totalResults}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;