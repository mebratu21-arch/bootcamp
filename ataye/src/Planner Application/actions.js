// Action Types
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const SET_SELECTED_DATE = 'SET_SELECTED_DATE';

// Action Creators
let nextTaskId = 0;

export const addTask = (date, text) => ({
  type: ADD_TASK,
  payload: {
    id: ++nextTaskId,
    date,
    text
  }
});

export const editTask = (date, id, text) => ({
  type: EDIT_TASK,
  payload: { date, id, text }
});

export const deleteTask = (date, id) => ({
  type: DELETE_TASK,
  payload: { date, id }
});

export const toggleTask = (date, id) => ({
  type: TOGGLE_TASK,
  payload: { date, id }
});

export const setSelectedDate = (date) => ({
  type: SET_SELECTED_DATE,
  payload: { date }
});
