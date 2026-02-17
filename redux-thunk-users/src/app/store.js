import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/users/userSlice'

// Initialize Store: Step 1
export const store = configureStore({
  reducer: {
    users: userReducer,
  },
})
