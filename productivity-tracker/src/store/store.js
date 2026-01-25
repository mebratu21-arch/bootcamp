import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';
import categoriesReducer from './slices/categoriesSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    categories: categoriesReducer,
  },
  // Redux DevTools enabled by default in development
});

export default store;
