import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';
import '../TodoApp.css';

const AddTodo = ({ dispatch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      return;
    }
    dispatch(addTodo(input));
    setInput('');
  };

  return (
    <div className="add-todo-container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default connect()(AddTodo);
