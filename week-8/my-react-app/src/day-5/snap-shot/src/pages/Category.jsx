// src/pages/Category.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Gallery from '../components/Gallery';
import { pexelsApi } from '../services/pexelsApi';

const Category = () => {
  const { categoryName } = useParams();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (categoryName) {
      fetchCategoryPhotos();
    }
  }, [categoryName, currentPage]);

  const fetchCategoryPhotos = async () => {
    setIsLoading(true);
    try {
      const data = await pexelsApi.getPhotosByCategory(categoryName, currentPage);
      setImages(data.photos);
      setTotalResults(data.total_results || 0);
    } catch (error) {
      console.error('Error fetching category photos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const formattedCategory = categoryName
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : '';

  return (
    <div className="page">
      <div className="page-header">
        <h1>{formattedCategory} Photos</h1>
        <p className="category-description">
          Explore beautiful {formattedCategory.toLowerCase()} images from our collection
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

export default Category;