import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskComplete } from '../store/taskSlice';
import './TaskItem.css';

const TaskItem = ({ task, date, onEdit }) => {
  const dispatch = useDispatch();
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask({ date, taskId: task.id }));
    }
  };
  
  const handleToggleComplete = () => {
    dispatch(toggleTaskComplete({ date, taskId: task.id }));
  };
  
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          id={`task-${task.id}`}
        />
        <label htmlFor={`task-${task.id}`}></label>
      </div>
      
      <div className="task-content">
        <h4 className="task-title">{task.title}</h4>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        {task.time && (
          <span className="task-time">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 4V8L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {task.time}
          </span>
        )}
      </div>
      
      <div className="task-actions">
        <button
          onClick={() => onEdit(task)}
          className="action-button edit-button"
          title="Edit task"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M12.5 2.5L15.5 5.5M1 17L4 16L15.5 4.5C16.328 3.672 16.328 2.328 15.5 1.5C14.672 0.672 13.328 0.672 12.5 1.5L1 13L1 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={handleDelete}
          className="action-button delete-button"
          title="Delete task"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 4H16M14 4V15C14 16.1046 13.1046 17 12 17H6C4.89543 17 4 16.1046 4 15V4M6 4V2C6 1.44772 6.44772 1 7 1H11C11.5523 1 12 1.44772 12 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
