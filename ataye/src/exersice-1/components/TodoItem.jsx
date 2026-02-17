import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toggleTodo, removeTodo, editTodo } from '../actions';

const TodoItem = ({ todo, toggleTodo, removeTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      editTodo(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <input 
          type="text" 
          value={editText} 
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="edit-input"
          autoFocus
        />
      ) : (
        <span 
          onClick={() => toggleTodo(todo.id)}
          style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
        >
          {todo.text}
        </span>
      )}
      
      <button className="edit-btn" onClick={handleEdit}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
      <button className="delete-btn" onClick={() => removeTodo(todo.id)}>
        Delete
      </button>
    </li>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleTodo: (id) => dispatch(toggleTodo(id)),
  removeTodo: (id) => dispatch(removeTodo(id)),
  editTodo: (id, text) => dispatch(editTodo(id, text))
});

export default connect(null, mapDispatchToProps)(TodoItem);
