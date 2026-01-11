// Action Types
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';

// Action Creators
let nextTodoId = 0;

export const addTodo = (category, text) => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    category,
    text
  }
});

export const removeTodo = (category, id) => ({
  type: REMOVE_TODO,
  payload: { category, id }
});

export const toggleTodo = (category, id) => ({
  type: TOGGLE_TODO,
  payload: { category, id }
});

export const addCategory = (category) => ({
  type: ADD_CATEGORY,
  payload: { category }
});

export const removeCategory = (category) => ({
  type: REMOVE_CATEGORY,
  payload: { category }
});
