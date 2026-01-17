import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

const TaskList = () => {
  const selectedDate = useSelector((state) => state.planner.selectedDate);
  const tasks = useSelector((state) => state.planner.tasks[selectedDate] || []);

  if (tasks.length === 0) {
    return <p className="no-tasks">No tasks for today. Relax! 🍹</p>;
  }

  return (
    <div className="task-list-container">
      <h3>Tasks for {selectedDate}</h3>
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
