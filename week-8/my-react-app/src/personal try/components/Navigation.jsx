import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <h1 className="nav-logo">TechShop</h1>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><CartIcon /></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;