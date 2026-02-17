import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import './TodoApp.css';

const TodoApp = () => {
  return (
    <Provider store={store}>
      <div className="todo-app-container">
        <h1>Redux Todo List</h1>
        <AddTodo />
        <TodoList />
      </div>
    </Provider>
  );
};

export default TodoApp;
