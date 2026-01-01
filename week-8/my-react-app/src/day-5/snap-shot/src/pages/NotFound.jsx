// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-text">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="home-button">
            Go to Homepage
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="back-button"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;