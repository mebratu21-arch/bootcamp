import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import { loadState, saveState } from '../utils/localStorage';

// Load persisted state from localStorage
const persistedState = loadState();

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  preloadedState: persistedState,
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState({
    tasks: store.getState().tasks,
  });
});

export default store;
