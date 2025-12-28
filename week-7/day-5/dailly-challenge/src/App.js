import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './App.css';

const App = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1200&h=600&fit=crop",
      alt: "Hong Kong",
      city: "Hong Kong"
    },
    {
      src: "https://images.unsplash.com/photo-1576426665052-d95597b4a6aa?w=1200&h=600&fit=crop",
      alt: "Macao",
      city: "Macao"
    },
    {
      src: "https://images.unsplash.com/photo-1552842178-7988b8f694ee?w=1200&h=600&fit=crop",
      alt: "Japan",
      city: "Japan"
    },
    {
      src: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=1200&h=600&fit=crop",
      alt: "Las Vegas",
      city: "Las Vegas"
    }
  ];

  return (
    <div className="app">
      <Carousel
        showThumbs={true}
        showStatus={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={4000}
        emulateTouch={true}
        dynamicHeight={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <button 
            onClick={clickHandler} 
            className={`carousel-arrow prev ${!hasPrev && 'disabled'}`}
          />
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <button 
            onClick={clickHandler} 
            className={`carousel-arrow next ${!hasNext && 'disabled'}`}
          />
        )}
        renderIndicator={(clickHandler, isSelected, index) => (
          <div
            className={`carousel-indicator ${isSelected && 'active'}`}
            onClick={clickHandler}
          />
        )}
        renderStatus={(current, total) => (
          <p className="carousel-status">{current} of {total}</p>
        )}
      >
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img src={image.src} alt={image.alt} />
            <div className="carousel-caption">
              <h2>{image.city}</h2>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default App;