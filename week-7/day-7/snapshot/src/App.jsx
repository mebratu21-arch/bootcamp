import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import PhotoContextProvider from './context/PhotoContext';
import Header from './components/Header';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <PhotoContextProvider>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/mountain" replace />} />
            <Route path="/search/:searchInput" element={<Gallery />} />
            <Route path="/:searchInput" element={<Gallery />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </PhotoContextProvider>
  );
}

export default App;
