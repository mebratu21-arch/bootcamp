import React from 'react';
import Navigation from './Navigation';
import SearchForm from './SearchForm';

const Header = () => {
  return (
    <div>
      <h1>SnapShot</h1>
      <SearchForm />
      <Navigation />
    </div>
  );
}

export default Header;
