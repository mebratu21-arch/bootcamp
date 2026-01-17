import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo, removeTodo } from '../actions';

const TodoItem = ({ todo, category, toggleTodo, removeTodo }) => {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span 
        onClick={() => toggleTodo(category, todo.id)}
        style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
      >
        {todo.text}
      </span>
      <button className="delete-btn" onClick={() => removeTodo(category, todo.id)}>
        Delete
      </button>
    </li>
  );
};

const mapDispatchToProps = { toggleTodo, removeTodo };

export default connect(null, mapDispatchToProps)(TodoItem);
