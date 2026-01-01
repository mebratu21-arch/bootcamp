// src/App.js
import React from 'react';
import AutoCompletedText from './AutoCompletedText';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Autocomplete Search Demo</h1>
        <AutoCompletedText />
      </header>
    </div>
  );
}

export default App;