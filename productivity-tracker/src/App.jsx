import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import store from './store/store';
import CategorySelector from './components/CategorySelector';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import {
  selectCompletedTasks,
  selectIncompleteTasks,
  selectTaskProgress,
} from './store/selectors/taskSelectors';
import './App.css';

function AppContent() {
  const completedCount = useSelector(selectCompletedTasks);
  const incompleteCount = useSelector(selectIncompleteTasks);
  const overallProgress = useSelector(selectTaskProgress);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>📊 Productivity Tracker</h1>
          <p className="subtitle">Track your tasks and boost your productivity</p>
        </div>
        <div className="stats">
          <div className="stat-card">
            <span className="stat-value">{completedCount}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{incompleteCount}</span>
            <span className="stat-label">In Progress</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{overallProgress}%</span>
            <span className="stat-label">Overall Progress</span>
          </div>
        </div>
      </header>

      <main className="app-main">
        <aside className="sidebar">
          <CategorySelector />
          <TaskForm />
        </aside>
        <section className="content">
          <TaskList />
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
