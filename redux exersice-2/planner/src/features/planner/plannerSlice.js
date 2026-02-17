import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: {}, // Format: { 'YYYY-MM-DD': [{ id, text, completed }] }
  selectedDate: new Date().toISOString().split('T')[0],
};

const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    addTask: (state, action) => {
      const { date, text } = action.payload;
      if (!state.tasks[date]) {
        state.tasks[date] = [];
      }
      state.tasks[date].push({
        id: Date.now(),
        text,
        completed: false,
      });
    },
    toggleTask: (state, action) => {
      const { date, id } = action.payload;
      const tasks = state.tasks[date];
      if (tasks) {
        const task = tasks.find(t => t.id === id);
        if (task) {
          task.completed = !task.completed;
        }
      }
    },
    deleteTask: (state, action) => {
      const { date, id } = action.payload;
      if (state.tasks[date]) {
        state.tasks[date] = state.tasks[date].filter(t => t.id !== id);
      }
    },
    editTask: (state, action) => {
      const { date, id, text } = action.payload;
      const tasks = state.tasks[date];
      if (tasks) {
        const task = tasks.find(t => t.id === id);
        if (task) {
          task.text = text;
        }
      }
    },
  },
});

export const { setSelectedDate, addTask, toggleTask, deleteTask, editTask } = plannerSlice.actions;
export default plannerSlice.reducer;
