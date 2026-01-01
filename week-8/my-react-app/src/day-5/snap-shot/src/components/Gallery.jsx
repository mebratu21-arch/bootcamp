// src/components/Gallery.js
import React, { useState, useEffect } from 'react';
import ImageCard from './ImageCard';
import Loader from './Loader';
import Pagination from './Pagination';

const Gallery = ({ images, isLoading, currentPage, totalResults, onPageChange }) => {
  const [hoveredImageId, setHoveredImageId] = useState(null);

  if (isLoading) {
    return <Loader />;
  }

  if (!images || images.length === 0) {
    return (
      <div className="no-results">
        <h3>No images found</h3>
        <p>Try a different search term or category</p>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      {/* Results Info */}
      {totalResults > 0 && (
        <div className="results-info">
          <p>Found {totalResults.toLocaleString()} images</p>
        </div>
      )}

      {/* Image Grid */}
      <div className="image-grid">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            isHovered={hoveredImageId === image.id}
            onMouseEnter={() => setHoveredImageId(image.id)}
            onMouseLeave={() => setHoveredImageId(null)}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalResults > images.length && (
        <Pagination
          currentPage={currentPage}
          totalResults={totalResults}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default Gallery;