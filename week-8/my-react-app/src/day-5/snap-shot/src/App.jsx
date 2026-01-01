// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Category from './pages/Category';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import './styles/App.css';

function App() {
  const categories = ['Mountain', 'Beaches', 'Birds', 'Food', 'Animals', 'Cities', 'Nature', 'Sports'];

  return (
    <Router>
      <div className="App">
        <Navbar categories={categories} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/search/:query" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>Snap Shot Gallery • Powered by Pexels API</p>
          <p>© {new Date().getFullYear()} All rights reserved</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;