import React, { createContext, useState } from "react";
import { apiKey } from "../api/config";

export const PhotoContext = createContext();

const PhotoContextProvider = (props) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const runSearch = (query) => {
    setLoading(true);
    fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=30`, {
      headers: {
        Authorization: apiKey
      }
    })
      .then(response => {
        if (!response.ok) {
           throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setImages(data.photos);
        setLoading(false);
      })
      .catch(error => {
        console.log("Encountered an error with fetching and parsing data", error);
        // Fallback for demo if no API key or error
        setImages([]); 
        setLoading(false);
      });
  };

  return (
    <PhotoContext.Provider value={{ images, loading, runSearch }}>
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoContextProvider;
