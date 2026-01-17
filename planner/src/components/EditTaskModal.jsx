import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../store/taskSlice';
import './EditTaskModal.css';

const EditTaskModal = ({ task, date, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [time, setTime] = useState(task.time);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }
    
    dispatch(editTask({
      date,
      taskId: task.id,
      updatedTask: {
        title: title.trim(),
        description: description.trim(),
        time,
      },
    }));
    
    onClose();
  };
  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Task</h3>
          <button onClick={onClose} className="close-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="edit-title">Title *</label>
            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-description">Description</label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              rows="4"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-time">Time</label>
            <input
              id="edit-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="form-input"
            />
          </div>
          
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
