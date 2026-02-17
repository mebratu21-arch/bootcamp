import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/users/userSlice'
import inventoryReducer from '../features/inventory/inventorySlice'
import { persistenceMiddleware, rehydrateState } from './middleware'

const preloadedState = rehydrateState()

export const store = configureStore({
  reducer: {
    users: userReducer,
    inventory: inventoryReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistenceMiddleware),
})
