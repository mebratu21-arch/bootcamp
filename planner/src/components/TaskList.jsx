import { useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import EditTaskModal from './EditTaskModal';
import './TaskList.css';

const TaskList = () => {
  const selectedDate = useSelector((state) => state.tasks.selectedDate);
  const tasks = useSelector((state) => state.tasks.tasks[selectedDate] || []);
  const [editingTask, setEditingTask] = useState(null);
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const handleEdit = (task) => {
    setEditingTask(task);
  };
  
  const handleCloseEdit = () => {
    setEditingTask(null);
  };
  
  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2 className="selected-date">{formatDate(selectedDate)}</h2>
        <span className="task-count">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>
      
      {tasks.length === 0 ? (
        <div className="empty-state">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.3"/>
            <path d="M40 25V55M25 40H55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
          </svg>
          <h3>No tasks yet</h3>
          <p>Add your first task to get started!</p>
        </div>
      ) : (
        <div className="tasks-container">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              date={selectedDate}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
      
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          date={selectedDate}
          onClose={handleCloseEdit}
        />
      )}
    </div>
  );
};

export default TaskList;
