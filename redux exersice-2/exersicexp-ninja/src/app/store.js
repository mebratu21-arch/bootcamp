import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from '../features/inventory/inventorySlice';
import uiReducer from '../features/ui/uiSlice';
import { analyticsMiddleware } from './analyticsMiddleware';

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(analyticsMiddleware),
});
