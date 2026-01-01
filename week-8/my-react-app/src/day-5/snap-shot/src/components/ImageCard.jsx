// src/components/ImageCard.js
import React from 'react';

const ImageCard = ({ image, isHovered, onMouseEnter, onMouseLeave }) => {
  const {
    id,
    src,
    alt,
    photographer,
    photographer_url,
    avg_color
  } = image;

  return (
    <div 
      className={`image-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ '--card-bg': avg_color }}
    >
      <div className="image-wrapper">
        <img 
          src={src?.medium || src?.large || src?.original} 
          alt={alt || `Photo by ${photographer}`}
          loading="lazy"
          className="gallery-image"
        />
        
        {/* Overlay on hover */}
        <div className="image-overlay">
          <div className="overlay-content">
            <a 
              href={photographer_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="photographer-link"
            >
              <span className="photographer-icon">📷</span>
              <span className="photographer-name">{photographer}</span>
            </a>
            <a 
              href={src?.original} 
              target="_blank" 
              rel="noopener noreferrer"
              className="download-link"
              title="Download original"
            >
              ⬇️
            </a>
          </div>
        </div>
      </div>
      
      {/* Photographer info (visible on mobile) */}
      <div className="image-info">
        <a 
          href={photographer_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="photographer-credit"
        >
          Photo by {photographer}
        </a>
      </div>
    </div>
  );
};

export default ImageCard;