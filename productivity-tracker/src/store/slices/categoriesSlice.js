import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    {
      id: '1',
      name: 'Development',
      color: '#6366f1',
      description: 'Software development tasks',
    },
    {
      id: '2',
      name: 'Meetings',
      color: '#f59e0b',
      description: 'Team meetings and calls',
    },
    {
      id: '3',
      name: 'Personal',
      color: '#10b981',
      description: 'Personal tasks and goals',
    },
  ],
  selectedCategoryId: null, // null means "All Categories"
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const newCategory = {
        id: Date.now().toString(),
        name: action.payload.name,
        color: action.payload.color || '#6b7280',
        description: action.payload.description || '',
      };
      state.categories.push(newCategory);
    },

    editCategory: (state, action) => {
      const { id, updates } = action.payload;
      const categoryIndex = state.categories.findIndex((cat) => cat.id === id);
      if (categoryIndex !== -1) {
        state.categories[categoryIndex] = {
          ...state.categories[categoryIndex],
          ...updates,
        };
      }
    },

    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (cat) => cat.id !== action.payload
      );
      // Reset selection if deleted category was selected
      if (state.selectedCategoryId === action.payload) {
        state.selectedCategoryId = null;
      }
    },

    setSelectedCategory: (state, action) => {
      state.selectedCategoryId = action.payload; // null for "All"
    },
  },
});

export const {
  addCategory,
  editCategory,
  deleteCategory,
  setSelectedCategory,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
