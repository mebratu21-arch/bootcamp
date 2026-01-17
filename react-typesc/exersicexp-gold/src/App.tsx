import { useState } from 'react'
import BookFinder from './components/BookFinder'
import MultiStepForm from './components/MultiStepForm'
import GroceryList from './components/GroceryList'
import './App.css'

function App() {
  const [activeExercise, setActiveExercise] = useState<number>(1)

  return (
    <div className="app">
      <header className="app-header">
        <h1>React + TypeScript Gold Exercises</h1>
        <nav className="exercise-nav">
          <button 
            className={activeExercise === 1 ? 'active' : ''} 
            onClick={() => setActiveExercise(1)}
          >
            1: Book Finder
          </button>
          <button 
            className={activeExercise === 2 ? 'active' : ''} 
            onClick={() => setActiveExercise(2)}
          >
            2: Multi-step Form
          </button>
          <button 
            className={activeExercise === 3 ? 'active' : ''} 
            onClick={() => setActiveExercise(3)}
          >
            3: Grocery List
          </button>
        </nav>
      </header>
      
      <main className="exercise-container">
        {activeExercise === 1 && <BookFinder />}
        {activeExercise === 2 && <MultiStepForm />}
        {activeExercise === 3 && <GroceryList />}
      </main>

      <footer className="app-footer">
        <p>Developers Institute - Gold Level Exercise Solutions</p>
      </footer>
    </div>
  )
}

export default App
