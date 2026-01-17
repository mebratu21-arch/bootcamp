import { useState } from 'react';
import { Layout } from './components/Layout';
import { CounterExercise } from './exercises/CounterExercise';
import { TodoExercise } from './exercises/TodoExercise';
import { ProfileExercise } from './exercises/ProfileExercise';
import Exercise1_UserProfile from '../exersicexp-ninja/Exercise1_UserProfile';
import Exercise2_SurveyFeedback from '../exersicexp-ninja/Exercise2_SurveyFeedback';
import Exercise3_ContactForm from '../exersicexp-ninja/Exercise3_ContactForm';
import Exercise4_ContactApp from '../exersicexp-ninja/Exercise4_ContactApp';
import Exercise5_RefExample from '../exersicexp-ninja/Exercise5_RefExample';
import type { Exercise } from './exercises/types';
import './App.css';

function App() {
  const [activeId, setActiveId] = useState<string>('welcome');

  const exercises: Exercise[] = [
    {
      id: 'ex1',
      title: 'Counter & History',
      description: 'Master useState with complex updates and history tracking.',
      component: CounterExercise
    },
    {
      id: 'ex2',
      title: 'Task Manager',
      description: 'Handling arrays, forms, and conditionally rendering lists.',
      component: TodoExercise
    },
    {
      id: 'ex3',
      title: 'User Profile',
      description: 'Learn about Props interface definitions and parent-child communication.',
      component: ProfileExercise
    },
    {
      id: 'ex-ninja-1',
      title: 'Ninja 1: User Profile (useReducer)',
      description: 'Managing loading, success, and error states with useReducer.',
      component: Exercise1_UserProfile
    },
    {
      id: 'ex-ninja-2',
      title: 'Ninja 2: Survey Feedback',
      description: 'Survey workflow management (initial, submitting, completed).',
      component: Exercise2_SurveyFeedback
    },
    {
      id: 'ex-ninja-3',
      title: 'Ninja 3: Form State',
      description: 'Complex form state handling and reset functionality.',
      component: Exercise3_ContactForm
    },
    {
      id: 'ex-ninja-4',
      title: 'Ninja 4: Contact Context',
      description: 'Global state management with useContext and custom hooks.',
      component: Exercise4_ContactApp
    },
    {
      id: 'ex-ninja-5',
      title: 'Ninja 5: DOM Refs',
      description: 'Direct DOM manipulation using useRef hooks.',
      component: Exercise5_RefExample
    },
  ];

  const activeExercise = exercises.find(ex => ex.id === activeId);

  return (
    <Layout 
      exercises={exercises} 
      activeId={activeId} 
      onSelect={setActiveId}
    >
      {activeId === 'welcome' ? (
        <div className="exercise-header">
           <h1>Welcome to ReactLab</h1>
           <p className="exercise-description">
             Select an exercise from the sidebar to practice your React and TypeScript skills.
             Each module is designed to teach a specific concept.
           </p>
           <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
             {exercises.map(ex => (
               <div 
                 key={ex.id} 
                 className="feature-card"
                 onClick={() => setActiveId(ex.id)}
                 style={{ cursor: 'pointer' }}
               >
                 <h3>{ex.title}</h3>
                 <p>{ex.description}</p>
                 <span style={{ color: 'var(--md-sys-color-primary)', display: 'block', marginTop: '1rem', fontWeight: 500 }}>
                   Start Exercise →
                 </span>
               </div>
             ))}
           </div>
        </div>
      ) : activeExercise ? (
        <div className="exercise-container">
          <header className="exercise-header">
            <h1>{activeExercise.title}</h1>
            <p className="exercise-description">{activeExercise.description}</p>
          </header>
          <div className="exercise-playground">
            <activeExercise.component />
          </div>
        </div>
      ) : (
        <div>Exercise not found</div>
      )}
    </Layout>
  );
}

export default App;
