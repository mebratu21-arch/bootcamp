import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/taskSlice';
import './AddTaskForm.css';

const AddTaskForm = ({ selectedDate }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }
    
    dispatch(addTask({
      date: selectedDate,
      task: {
        title: title.trim(),
        description: description.trim(),
        time: time,
      },
    }));
    
    // Reset form
    setTitle('');
    setDescription('');
    setTime('');
    setError('');
  };
  
  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Add New Task</h3>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <input
          type="text"
          placeholder="Task title *"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError('');
          }}
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
          rows="3"
        />
      </div>
      
      <div className="form-group">
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="form-input"
        />
      </div>
      
      <button type="submit" className="submit-button">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 5V15M5 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
