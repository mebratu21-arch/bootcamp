import React from 'react';
import Clock from './components/Clock';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Compass Clock</h1>
        <p>A class component implementation</p>
      </header>
      <main>
        <Clock />
      </main>
      <footer>
        <p>Exercise: Display current date and time in compass format</p>
      </footer>
    </div>
  );
}

export default App;