import React, { useReducer } from 'react';

// 1. Define State and Action Types
type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormAction =
  | { type: 'UPDATE_FIELD'; field: keyof FormState; value: string }
  | { type: 'RESET_FORM' };

// 2. Set Up Initial State
const initialState: FormState = {
  name: '',
  email: '',
  message: '',
};

// 3. Create the Reducer Function
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return initialState;
    default:
      // Typically we'd return state, but for exhaustive checks or robustness:
      return state;
  }
};

// 4. Use the Reducer in a Component
const Exercise3_ContactForm: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field: e.target.name as keyof FormState,
      value: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Submitted:\nName: ${state.name}\nEmail: ${state.email}\nMessage: ${state.message}`);
      dispatch({ type: 'RESET_FORM'});
  }

  return (
    <div className="exercise-container">
      <h2>Exercise 3: Contact Form</h2>
      
      <div className="card">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={state.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={state.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows={4}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit">Submit Details</button>
            <button 
              type="button" 
              onClick={() => dispatch({ type: 'RESET_FORM' })}
              className="secondary"
            >
              Reset Form
            </button>
          </div>
        </form>

        <div className="state-preview">
          <h3>Current State:</h3>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default Exercise3_ContactForm;
