import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, toggleTask, editTask } from '../features/planner/plannerSlice';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.planner.selectedDate);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleToggle = () => {
    dispatch(toggleTask({ date: selectedDate, id: task.id }));
  };

  const handleDelete = () => {
    dispatch(deleteTask({ date: selectedDate, id: task.id }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim()) {
      dispatch(editTask({ date: selectedDate, id: task.id, text: editText }));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="task-edit">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div className="task-view">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
          />
          <span className="task-text">{task.text}</span>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
