import React, { createContext, useReducer, useContext } from 'react';
import type { ReactNode } from 'react';
import type { ContactState, ContactAction } from '../types';

// 2. Create Context
const ContactContext = createContext<{
  state: ContactState;
  dispatch: React.Dispatch<ContactAction>;
} | undefined>(undefined);

// 3. Set Initial State NOT EXPORTED
const initialState: ContactState = {
  contacts: [],
};

// 4. Create Reducer
const contactReducer = (state: ContactState, action: ContactAction): ContactState => {
  switch (action.type) {
    case 'ADD_CONTACT':
      return { contacts: [...state.contacts, action.payload] };
    case 'REMOVE_CONTACT':
      return {
        contacts: state.contacts.filter((contact) => contact.id !== action.payload),
      };
    default:
      return state;
  }
};

// 5. Create Provider Component
export const ContactProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};

// 6. Custom Hook to Access Context
export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
};
