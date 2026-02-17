import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTask } from '../actions';

const AddTask = ({ selectedDate, addTask }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask(selectedDate, text);
    setText('');
  };

  return (
    <div className="add-todo-container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedDate: state.selectedDate
});

const mapDispatchToProps = { addTask };

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
