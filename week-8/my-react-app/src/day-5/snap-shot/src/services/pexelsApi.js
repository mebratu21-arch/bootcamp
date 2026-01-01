// src/services/pexelsApi.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const BASE_URL = import.meta.env.VITE_PEXELS_BASE_URL;
const PER_PAGE = import.meta.env.VITE_IMAGES_PER_PAGE || 30;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: API_KEY
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