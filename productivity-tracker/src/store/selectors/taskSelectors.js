import { createSelector } from 'reselect';

// Base selectors
export const selectAllTasks = (state) => state.tasks.tasks;

// Memoized selector: Get tasks by category
// This will only recompute when tasks or the category filter changes
export const selectTasksByCategory = createSelector(
  [
    selectAllTasks,
    (state, categoryId) => categoryId, // category parameter
  ],
  (tasks, categoryId) => {
    // If no category selected (null), return all tasks
    if (categoryId === null) {
      return tasks;
    }
    // Filter tasks by category
    return tasks.filter((task) => task.categoryId === categoryId);
  }
);

// Memoized selector: Count completed tasks
export const selectCompletedTasks = createSelector([selectAllTasks], (tasks) => {
  return tasks.filter((task) => task.completed).length;
});

// Memoized selector: Count incomplete tasks
export const selectIncompleteTasks = createSelector(
  [selectAllTasks],
  (tasks) => {
    return tasks.filter((task) => !task.completed).length;
  }
);

// Memoized selector: Calculate overall progress
export const selectTaskProgress = createSelector([selectAllTasks], (tasks) => {
  if (tasks.length === 0) return 0;
  const totalProgress = tasks.reduce((sum, task) => sum + task.progress, 0);
  return Math.round(totalProgress / tasks.length);
});

// Memoized selector: Get task by ID
export const selectTaskById = createSelector(
  [selectAllTasks, (state, taskId) => taskId],
  (tasks, taskId) => {
    return tasks.find((task) => task.id === taskId);
  }
);
