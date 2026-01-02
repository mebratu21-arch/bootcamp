// src/services/pexelsApi.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_PEXELS_API_KEY;
const BASE_URL = process.env.REACT_APP_PEXELS_BASE_URL;
const PER_PAGE = process.env.REACT_APP_IMAGES_PER_PAGE || 30;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: SmNxCMRhQ1dVvJzizV5sPMkeLIqIiAhI1xLJz3dqjcAIGq1xjqU9E6yq
  }
});

export const pexelsApi = {
  // Get curated photos
  getCuratedPhotos: async (page = 1) => {
    try {
      const response = await api.get(`/curated?page=${page}&per_page=${PER_PAGE}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching curated photos:', error);
      throw error;
    }
  },

  // Search photos
  searchPhotos: async (query, page = 1) => {
    try {
      const response = await api.get(`/search?query=${query}&page=${page}&per_page=${PER_PAGE}`);
      return response.data;
    } catch (error) {
      console.error('Error searching photos:', error);
      throw error;
    }
  },

  // Get photos by category
  getPhotosByCategory: async (category, page = 1) => {
    try {
      const response = await api.get(`/search?query=${category}&page=${page}&per_page=${PER_PAGE}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category photos:', error);
      throw error;
    }
  }
};

export default pexelsApi;