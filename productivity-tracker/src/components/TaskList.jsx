import { useSelector } from 'react-redux';
import { selectTasksByCategory } from '../store/selectors/taskSelectors';
import { selectSelectedCategoryId } from '../store/selectors/categorySelectors';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

function TaskList() {
  const selectedCategoryId = useSelector(selectSelectedCategoryId);
  
  // Use memoized selector to get filtered tasks
  const tasks = useSelector((state) =>
    selectTasksByCategory(state, selectedCategoryId)
  );

  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <div className="empty-icon">📋</div>
        <h3>No tasks yet</h3>
        <p>
          {selectedCategoryId
            ? 'No tasks in this category. Start by adding a new task!'
            : 'Create your first task to get started.'}
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h3>Tasks</h3>
        <span className="task-count">{tasks.length} task{tasks.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="tasks-container">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
