import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: {}, // { 'YYYY-MM-DD': [{ id, title, description, time, completed }] }
  selectedDate: new Date().toISOString().split('T')[0],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    
    addTask: (state, action) => {
      const { date, task } = action.payload;
      if (!state.tasks[date]) {
        state.tasks[date] = [];
      }
      state.tasks[date].push({
        id: Date.now() + Math.random(),
        ...task,
        completed: false,
      });
    },
    
    editTask: (state, action) => {
      const { date, taskId, updatedTask } = action.payload;
      if (state.tasks[date]) {
        const taskIndex = state.tasks[date].findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
          state.tasks[date][taskIndex] = {
            ...state.tasks[date][taskIndex],
            ...updatedTask,
          };
        }
      }
    },
    
    deleteTask: (state, action) => {
      const { date, taskId } = action.payload;
      if (state.tasks[date]) {
        state.tasks[date] = state.tasks[date].filter(t => t.id !== taskId);
        if (state.tasks[date].length === 0) {
          delete state.tasks[date];
        }
      }
    },
    
    toggleTaskComplete: (state, action) => {
      const { date, taskId } = action.payload;
      if (state.tasks[date]) {
        const task = state.tasks[date].find(t => t.id === taskId);
        if (task) {
          task.completed = !task.completed;
        }
      }
    },
    
    loadTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const {
  setSelectedDate,
  addTask,
  editTask,
  deleteTask,
  toggleTaskComplete,
  loadTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
