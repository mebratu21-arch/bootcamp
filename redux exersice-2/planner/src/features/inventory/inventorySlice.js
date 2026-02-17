import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: []
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      // action.payload should be { id, name, quantity, price }
      const newProduct = {
        id: action.payload.id || Date.now(),
        name: action.payload.name,
        quantity: action.payload.quantity || 0,
        price: action.payload.price || 0
      };
      state.products.push(newProduct);
    },
    updateQuantity: (state, action) => {
      // action.payload should be { id, quantity }
      const product = state.products.find(p => p.id === action.payload.id);
      if (product) {
        product.quantity = action.payload.quantity;
      }
    },
    removeProduct: (state, action) => {
      // action.payload should be the product id
      state.products = state.products.filter(p => p.id !== action.payload);
    }
  }
});

export const { addProduct, updateQuantity, removeProduct } = inventorySlice.actions;
export default inventorySlice.reducer;
