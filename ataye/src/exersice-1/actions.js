// Action Types
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';

// Action Creators
let nextTodoId = 0;

export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    text
  }
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: { id }
});

export const EDIT_TODO = 'EDIT_TODO';

export const editTodo = (id, text) => ({
  type: EDIT_TODO,
  payload: { id, text }
});
