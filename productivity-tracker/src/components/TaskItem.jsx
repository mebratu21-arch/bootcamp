import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleTaskComplete,
  updateTaskProgress,
  deleteTask,
} from '../store/slices/tasksSlice';
import { selectCategoryById } from '../store/selectors/categorySelectors';
import '../styles/TaskItem.css';

function TaskItem({ task }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  
  // Get category for this task using memoized selector
  const category = useSelector((state) =>
    selectCategoryById(state, task.categoryId)
  );

  // useCallback to prevent re-creating functions on every render
  const handleToggleComplete = useCallback(() => {
    dispatch(toggleTaskComplete(task.id));
  }, [dispatch, task.id]);

  const handleProgressChange = useCallback(
    (e) => {
      const newProgress = parseInt(e.target.value, 10);
      dispatch(updateTaskProgress({ id: task.id, progress: newProgress }));
    },
    [dispatch, task.id]
  );

  const handleDelete = useCallback(() => {
    if (window.confirm(`Delete "${task.title}"?`)) {
      dispatch(deleteTask(task.id));
    }
  }, [dispatch, task.id, task.title]);

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <div className="task-checkbox">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
            id={`task-${task.id}`}
          />
          <label htmlFor={`task-${task.id}`} />
        </div>
        <div className="task-info">
          <h4 className="task-title">{task.title}</h4>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          {category && (
            <span
              className="task-category"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </span>
          )}
        </div>
        <button className="task-delete-btn" onClick={handleDelete} title="Delete task">
          🗑️
        </button>
      </div>

      <div className="task-progress">
        <div className="progress-header">
          <span className="progress-label">Progress</span>
          <span className="progress-value">{task.progress}%</span>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{
              width: `${task.progress}%`,
              backgroundColor: category?.color || '#6366f1',
            }}
          />
        </div>
        {!task.completed && (
          <input
            type="range"
            min="0"
            max="100"
            value={task.progress}
            onChange={handleProgressChange}
            className="progress-slider"
          />
        )}
      </div>
    </div>
  );
}

export default TaskItem;
