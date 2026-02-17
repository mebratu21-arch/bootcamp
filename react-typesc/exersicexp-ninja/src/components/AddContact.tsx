import React, { useState } from 'react';
import { useContacts } from './Exercise4_ContactContext';

const AddContact: React.FC = () => {
  const { dispatch } = useContacts();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      const newContact = {
        id: Date.now(),
        name,
        email,
      };
      
      dispatch({ type: 'ADD_CONTACT', payload: newContact });
      setName('');
      setEmail('');
    }
  };

  return (
    <div className="add-contact-section">
      <h3>Add New Contact</h3>
      <form onSubmit={handleSubmit} className="add-contact-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Contact Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Contact Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export default AddContact;
