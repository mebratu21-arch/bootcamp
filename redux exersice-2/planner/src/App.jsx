import DatePicker from './components/DatePicker';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>📅 Daily Planner</h1>
        <p>Stay organized and productive with Redux Toolkit</p>
      </header>

      <div className="container">
        <div className="planner-header">
          <DatePicker />
        </div>
        
        <div className="planner-main">
          <AddTask />
          <TaskList />
        </div>
      </div>
    </div>
  );
}

export default App;
