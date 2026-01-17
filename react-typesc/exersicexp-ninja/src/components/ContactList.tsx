import React from 'react';
import { useContacts } from './Exercise4_ContactContext';

const ContactList: React.FC = () => {
  const { state, dispatch } = useContacts();

  return (
    <div className="contact-list-section">
      <h3>Contacts List</h3>
      {state.contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul className="contact-list">
          {state.contacts.map((contact) => (
            <li key={contact.id} className="contact-item">
              <div className="contact-info">
                <strong>{contact.name}</strong>
                <span>{contact.email}</span>
              </div>
              <button
                onClick={() => dispatch({ type: 'REMOVE_CONTACT', payload: contact.id })}
                className="remove-btn"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
