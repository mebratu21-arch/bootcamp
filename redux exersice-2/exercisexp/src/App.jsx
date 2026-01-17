import './App.css'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📝 Redux Todo List</h1>
        <p className="subtitle">Manage your tasks with Redux Toolkit</p>
      </header>
      
      <main className="main-content">
        <AddTodo />
        <TodoList />
      </main>
      
      <footer className="app-footer">
        <p>Built with React + Redux Toolkit</p>
      </footer>
    </div>
  )
}

export default App
