import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    {
      id: '1',
      title: 'Build Redux store',
      description: 'Set up Redux Toolkit with slices and selectors',
      categoryId: '1',
      progress: 75,
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Create memoized selectors',
      description: 'Use createSelector for performance',
      categoryId: '1',
      progress: 50,
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Weekly team meeting',
      description: 'Discuss project progress and blockers',
      categoryId: '2',
      progress: 100,
      completed: true,
      createdAt: new Date().toISOString(),
    },
  ],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description || '',
        categoryId: action.payload.categoryId,
        progress: action.payload.progress || 0,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
    },

    editTask: (state, action) => {
      const { id, updates } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
      }
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    updateTaskProgress: (state, action) => {
      const { id, progress } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.progress = Math.min(100, Math.max(0, progress));
        // Auto-complete if progress reaches 100%
        if (task.progress === 100) {
          task.completed = true;
        }
      }
    },

    toggleTaskComplete: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        // Set progress to 100% when marking as complete
        if (task.completed) {
          task.progress = 100;
        }
      }
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  updateTaskProgress,
  toggleTaskComplete,
} = tasksSlice.actions;

export default tasksSlice.reducer;
