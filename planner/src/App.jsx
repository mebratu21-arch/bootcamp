import { useSelector } from 'react-redux';
import DatePicker from './components/DatePicker';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import './App.css';

function App() {
  const selectedDate = useSelector((state) => state.tasks.selectedDate);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="6" width="24" height="22" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M4 12H28" stroke="currentColor" strokeWidth="2"/>
              <path d="M10 4V8M22 4V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Daily Planner
          </h1>
          <p className="app-subtitle">Organize your day, accomplish your goals</p>
        </div>
      </header>

      <main className="app-main">
        <div className="calendar-section">
          <DatePicker />
        </div>

        <div className="tasks-section">
          <AddTaskForm selectedDate={selectedDate} />
          <TaskList />
        </div>
      </main>
    </div>
  );
}

export default App;
