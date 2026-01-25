import { createSelector } from 'reselect';

// Base selectors
export const selectAllCategories = (state) => state.categories.categories;
export const selectSelectedCategoryId = (state) =>
  state.categories.selectedCategoryId;

// Memoized selector: Get category by ID
export const selectCategoryById = createSelector(
  [selectAllCategories, (state, categoryId) => categoryId],
  (categories, categoryId) => {
    return categories.find((cat) => cat.id === categoryId);
  }
);

// Memoized selector: Get the currently selected category
export const selectSelectedCategory = createSelector(
  [selectAllCategories, selectSelectedCategoryId],
  (categories, selectedId) => {
    if (selectedId === null) return null;
    return categories.find((cat) => cat.id === selectedId);
  }
);

// Memoized selector: Count tasks per category
export const selectTaskCountByCategory = createSelector(
  [(state) => state.tasks.tasks, selectAllCategories],
  (tasks, categories) => {
    const counts = {};
    categories.forEach((cat) => {
      counts[cat.id] = tasks.filter((task) => task.categoryId === cat.id).length;
    });
    return counts;
  }
);
