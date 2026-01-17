import { configureStore } from '@reduxjs/toolkit';
import plannerReducer from '../features/planner/plannerSlice';

export const store = configureStore({
  reducer: {
    planner: plannerReducer
  }
});
