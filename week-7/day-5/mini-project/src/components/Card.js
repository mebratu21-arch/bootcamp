// src/components/Card.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding, 
  faGlobeAfrica, 
  faUniversity 
} from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  building: faBuilding,
  'globe-africa': faGlobeAfrica,
  university: faUniversity
};

const Card = ({ icon, title, text }) => {
  return (
    <div className="card">
      <div className="card-icon">
        <FontAwesomeIcon icon={iconMap[icon]} size="4x" color="#e74c3c" />
      </div>
      <h2 className="card-title">{title}</h2>
      <p className="card-text">{text}</p>
    </div>
  );
};

export default Card;