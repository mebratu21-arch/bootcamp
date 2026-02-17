import { configureStore } from '@reduxjs/toolkit'
import ageReducer from '../features/age/ageSlice'

// Store Setup: Step 1
export const store = configureStore({
  reducer: {
    age: ageReducer,
  },
})
