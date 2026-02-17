import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editTask, deleteTask, toggleTask } from '../actions';

const TaskItem = ({ task, date, editTask, deleteTask, toggleTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      editTask(date, task.id, editText);
    }
    setIsEditing(!isEditing);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    }
  };

  return (
    <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
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
          onClick={() => toggleTask(date, task.id)}
          style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
        >
          {task.text}
        </span>
      )}
      
      <button className="edit-btn" onClick={handleEdit}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
      <button className="delete-btn" onClick={() => deleteTask(date, task.id)}>
        Delete
      </button>
    </li>
  );
};

const mapDispatchToProps = { editTask, deleteTask, toggleTask };

export default connect(null, mapDispatchToProps)(TaskItem);
