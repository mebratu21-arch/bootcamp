import React from 'react';
import { connect } from 'react-redux';
import TaskItem from './TaskItem';

const TaskList = ({ selectedDate, tasks }) => {
  const tasksForDate = tasks[selectedDate] || [];

  return (
    <div className="task-list-container">
      <h3>Tasks for {selectedDate}</h3>
      {tasksForDate.length === 0 ? (
        <p className="empty-message">No tasks for this day.</p>
      ) : (
        <ul className="todo-list">
          {tasksForDate.map(task => (
            <TaskItem key={task.id} task={task} date={selectedDate} />
          ))}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedDate: state.selectedDate,
  tasks: state.tasks
});

export default connect(mapStateToProps)(TaskList);
