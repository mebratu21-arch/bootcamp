// src/App.js
import React from 'react';
import QuoteBox from './QuoteBox';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Quote Generator</h1>
        <p className="subtitle">Find inspiration in every click</p>
      </header>
      <main>
        <QuoteBox />
      </main>
      <footer className="App-footer">
        <p>Built with React • Refresh for new wisdom</p>
      </footer>
    </div>
  );
}

export default App;