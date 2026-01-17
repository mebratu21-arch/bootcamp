import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GenericState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: GenericState = {
  data: null,
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchError } = dataSlice.actions;
export default dataSlice.reducer;
