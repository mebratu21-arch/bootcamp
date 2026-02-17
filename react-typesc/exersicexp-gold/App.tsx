import { useState } from 'react';
import { RegistrationForm } from './RegistrationForm';
import { UserTable } from './UserTable';
import { UserList } from './UserList';
import './App.css';

type ExerciseTab = 'exercise1' | 'exercise2' | 'exercise3';

function App() {
  const [activeTab, setActiveTab] = useState<ExerciseTab>('exercise1');

  return (
    <div className="app">
      <header className="app-header">
        <h1>TypeScript React Exercises</h1>
        <p className="app-subtitle">Advanced Custom Hooks & Generic Components</p>
      </header>

      <nav className="exercise-nav">
        <button
          className={`nav-tab ${activeTab === 'exercise1' ? 'active' : ''}`}
          onClick={() => setActiveTab('exercise1')}
        >
          <span className="tab-number">1</span>
          <span className="tab-label">Form Management Hook</span>
        </button>
        <button
          className={`nav-tab ${activeTab === 'exercise2' ? 'active' : ''}`}
          onClick={() => setActiveTab('exercise2')}
        >
          <span className="tab-number">2</span>
          <span className="tab-label">Data Table Component</span>
        </button>
        <button
          className={`nav-tab ${activeTab === 'exercise3' ? 'active' : ''}`}
          onClick={() => setActiveTab('exercise3')}
        >
          <span className="tab-number">3</span>
          <span className="tab-label">Data Fetching & Caching</span>
        </button>
      </nav>

      <main className="exercise-content">
        {activeTab === 'exercise1' && (
          <section className="exercise-section">
            <div className="exercise-info">
              <h2>Exercise 1: Building a Form Management Custom Hook</h2>
              <p className="exercise-description">
                A reusable <code>useForm</code> hook that manages form state, performs field validation,
                and handles submission with TypeScript type safety.
              </p>
              <div className="success-criteria">
                <h3>Success Criteria:</h3>
                <ul>
                  <li>✓ Hook properly manages form state with TypeScript types</li>
                  <li>✓ Validation works for all required fields (email, password)</li>
                  <li>✓ Error messages display appropriately</li>
                  <li>✓ Form submission handles both success and error cases</li>
                </ul>
              </div>
            </div>
            <RegistrationForm />
          </section>
        )}

        {activeTab === 'exercise2' && (
          <section className="exercise-section">
            <div className="exercise-info">
              <h2>Exercise 2: Building a Data Table Component with Advanced TypeScript</h2>
              <p className="exercise-description">
                A generic <code>DataTable&lt;T&gt;</code> component that displays tabular data with
                configurable columns, sorting functionality, and row selection—all with full type safety.
              </p>
              <div className="success-criteria">
                <h3>Success Criteria:</h3>
                <ul>
                  <li>✓ Generic component works with any data type</li>
                  <li>✓ Column configuration supports custom rendering</li>
                  <li>✓ Sorting functionality toggles between asc/desc</li>
                  <li>✓ Row selection with individual and "select all" options</li>
                  <li>✓ TypeScript ensures type safety throughout</li>
                </ul>
              </div>
            </div>
            <UserTable />
          </section>
        )}

        {activeTab === 'exercise3' && (
          <section className="exercise-section">
            <div className="exercise-info">
              <h2>Exercise 3: Creating a Data Fetching and Caching System</h2>
              <p className="exercise-description">
                A <code>useDataFetching&lt;T&gt;</code> hook that fetches data from an API,
                implements in-memory caching with expiration, and provides cache invalidation.
              </p>
              <div className="success-criteria">
                <h3>Success Criteria:</h3>
                <ul>
                  <li>✓ Same request doesn't cause redundant calls within maxAge</li>
                  <li>✓ Loading state displays during fetch operations</li>
                  <li>✓ Error state shows when requests fail</li>
                  <li>✓ Cache invalidation forces fresh data fetch</li>
                  <li>✓ Manual refresh bypasses cache appropriately</li>
                </ul>
              </div>
            </div>
            <UserList />
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>Built with React + TypeScript + Vite</p>
        <p className="footer-note">
          Open DevTools Network tab to observe caching behavior in Exercise 3
        </p>
      </footer>
    </div>
  );
}

export default App;
