import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async Actions: Step 2
export const ageUpAsync = createAsyncThunk(
  'age/ageUpAsync',
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(1)
      }, 1000) // Simulate 1s delay
    })
  }
)

export const ageDownAsync = createAsyncThunk(
  'age/ageDownAsync',
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(1)
      }, 1000) // Simulate 1s delay
    })
  }
)

const initialState = {
  age: 0,
  loading: false,
}

// Age Slice: Step 3
const ageSlice = createSlice({
  name: 'age',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle Age Up
      .addCase(ageUpAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(ageUpAsync.fulfilled, (state) => {
        state.loading = false
        state.age += 1
      })
      // Handle Age Down
      .addCase(ageDownAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(ageDownAsync.fulfilled, (state) => {
        state.loading = false
        state.age -= 1
      })
  },
})

export default ageSlice.reducer
