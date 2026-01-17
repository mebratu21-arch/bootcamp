import React, { useState, useEffect } from 'react';
import { Task, Priority, Category } from './types';
import './App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [category, setCategory] = useState<Category>('Personal');
  const [filter, setFilter] = useState<Priority | 'All'>('All');
  const [catFilter, setCatFilter] = useState<Category | 'All'>('All');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      priority,
      category,
      completed: false,
    };
    
    setTasks([...tasks, newTask]);
    setText('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    const priorityMatch = filter === 'All' || t.priority === filter;
    const categoryMatch = catFilter === 'All' || t.category === catFilter;
    return priorityMatch && categoryMatch;
  });

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <header>
          <h1>✅ Priority Task Manager</h1>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </header>

        <form className="task-form" onSubmit={addTask}>
          <input 
            type="text" 
            placeholder="What needs to be done?" 
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
            <option value="High">🔴 High</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
            <option value="Work">💼 Work</option>
            <option value="Personal">🏠 Personal</option>
            <option value="Other">✨ Other</option>
          </select>
          <button type="submit">Add Task</button>
        </form>

        <div className="filters">
          <div className="filter-group">
            <label>Priority: </label>
            <select value={filter} onChange={(e) => setFilter(e.target.value as Priority | 'All')}>
              <option value="All">All Levels</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Category: </label>
            <select value={catFilter} onChange={(e) => setCatFilter(e.target.value as Category | 'All')}>
              <option value="All">All Categories</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <p className="empty-msg">No tasks found. Time to relax! 🛋️</p>
          ) : (
            filteredTasks.map(task => (
              <div key={task.id} className="task-item">
                <div className="task-content">
                  <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className={task.completed ? 'completed' : ''}>{task.text}</span>
                  <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
                  <span className="category-tag">[{task.category}]</span>
                </div>
                <button className="btn-delete" onClick={() => removeTask(task.id)}>🗑️</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
