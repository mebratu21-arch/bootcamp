import { useState } from 'react'
import Exercise1_UserProfile from './components/Exercise1_UserProfile'
import Exercise2_SurveyFeedback from './components/Exercise2_SurveyFeedback'
import Exercise3_ContactForm from './components/Exercise3_ContactForm'
import Exercise4_ContactApp from './components/Exercise4_ContactApp'
import Exercise5_RefExample from './components/Exercise5_RefExample'
import './App.css'

function App() {
  const [activeExercise, setActiveExercise] = useState(1)

  return (
    <div className="ninja-app">
      <header className="ninja-header">
        <h1>React + TypeScript Ninja Exercises</h1>
        <nav className="exercise-tabs">
          {[1, 2, 3, 4, 5].map((num) => (
            <button 
              key={num}
              className={activeExercise === num ? 'active' : ''} 
              onClick={() => setActiveExercise(num)}
            >
              Ex {num}
            </button>
          ))}
        </nav>
      </header>
      
      <main className="exercise-display">
        {activeExercise === 1 && <Exercise1_UserProfile />}
        {activeExercise === 2 && <Exercise2_SurveyFeedback />}
        {activeExercise === 3 && <Exercise3_ContactForm />}
        {activeExercise === 4 && <Exercise4_ContactApp />}
        {activeExercise === 5 && <Exercise5_RefExample />}
      </main>

      <footer className="ninja-footer">
        <p>Advanced React Patterns & Performance</p>
      </footer>
    </div>
  )
}

export default App
