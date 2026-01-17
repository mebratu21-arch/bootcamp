import React from 'react';
import { ContactProvider } from './Exercise4_ContactContext';
import ContactList from './ContactList';
import AddContact from './AddContact';

const Exercise4_ContactApp: React.FC = () => {
  return (
    <div className="exercise-container">
      <h2>Exercise 4: Global Contact List (useContext)</h2>
      <ContactProvider>
        <div className="card">
          <AddContact />
          <hr />
          <ContactList />
        </div>
      </ContactProvider>
    </div>
  );
};

export default Exercise4_ContactApp;
