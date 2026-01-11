import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import DatePicker from './components/DatePicker';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import './PlannerApp.css';

const PlannerApp = () => {
  return (
    <Provider store={store}>
      <div className="planner-app-container">
        <h1>📅 Daily Planner</h1>
        <DatePicker />
        <AddTask />
        <TaskList />
      </div>
    </Provider>
  );
};

export default PlannerApp;
