import React from 'react';
import { BookInput } from './components/BookInput';
import { BookList } from './components/BookList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Personal Library</h1>
        <p>Keep track of your reading journey</p>
      </header>
      <main>
        <BookInput />
        <BookList />
      </main>
    </div>
  );
};

export default App;

