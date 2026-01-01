import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

const HomeScreen = () => {
  return (
    <div>
      <Navigation />
      <h1>Home Screen</h1>
    </div>
  );
};

export default HomeScreen;  