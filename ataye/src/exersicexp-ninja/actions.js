// Auth Action Types
export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

// Todo Action Types
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';

// Auth Action Creators
export const registerUser = (username, password) => ({
  type: REGISTER_USER,
  payload: { username, password }
});

export const loginUser = (username, password) => ({
  type: LOGIN_USER,
  payload: { username, password }
});

export const logoutUser = () => ({
  type: LOGOUT_USER
});

// Todo Action Creators
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

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: { id }
});

export const editTodo = (id, text) => ({
  type: EDIT_TODO,
  payload: { id, text }
});
