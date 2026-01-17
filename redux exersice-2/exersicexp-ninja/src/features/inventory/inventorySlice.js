import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    { id: 1, name: 'Laptop', quantity: 10, price: 999.99, category: 'Electronics' },
    { id: 2, name: 'Mouse', quantity: 50, price: 25.99, category: 'Accessories' },
    { id: 3, name: 'Keyboard', quantity: 30, price: 79.99, category: 'Accessories' },
  ],
  categories: ['All', 'Electronics', 'Accessories', 'Office'],
  currentCategory: 'All',
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    addProduct: (state, action) => {
      const newProduct = {
        id: Date.now(),
        name: action.payload.name,
        quantity: parseInt(action.payload.quantity),
        price: parseFloat(action.payload.price),
        category: action.payload.category || 'Uncategorized',
      };
      state.products.push(newProduct);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.products.find(p => p.id === id);
      if (product) {
        product.quantity = parseInt(quantity);
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
  },
});

export const { setCategory, addProduct, updateQuantity, removeProduct } = inventorySlice.actions;

export default inventorySlice.reducer;
