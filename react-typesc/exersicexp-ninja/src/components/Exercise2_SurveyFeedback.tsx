import React, { useReducer, useState } from 'react';

// 1. Define State and Action Types
type SurveyStatus = 'initial' | 'submitting' | 'completed';

type SurveyState = {
  status: SurveyStatus;
  feedback: string;
};

type SurveyAction =
  | { type: 'START_SURVEY' }
  | { type: 'SUBMIT_FEEDBACK'; payload: string }
  | { type: 'RESET_SURVEY' };

// 2. Set Up Initial State
const initialState: SurveyState = {
  status: 'initial',
  feedback: '',
};

// 3. Create the Reducer Function
const surveyReducer = (state: SurveyState, action: SurveyAction): SurveyState => {
  switch (action.type) {
    case 'START_SURVEY':
      return { ...state, status: 'submitting' };
    case 'SUBMIT_FEEDBACK':
      return { ...state, status: 'completed', feedback: action.payload };
    case 'RESET_SURVEY':
      return initialState;
    default:
      return state;
  }
};

// 4. Use the Reducer in a Component
const Exercise2_SurveyFeedback: React.FC = () => {
  const [state, dispatch] = useReducer(surveyReducer, initialState);
  const [inputFeedback, setInputFeedback] = useState('');

  const  handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if(inputFeedback.trim()) {
          dispatch({ type: 'SUBMIT_FEEDBACK', payload: inputFeedback });
          setInputFeedback('');
      }
  }

  return (
    <div className="exercise-container">
      <h2>Exercise 2: Survey Feedback</h2>
      
      <div className="card">
        {state.status === 'initial' && (
          <div className="initial-view">
            <p>We'd love to hear your thoughts!</p>
            <button onClick={() => dispatch({ type: 'START_SURVEY' })}>
              Start Survey
            </button>
          </div>
        )}

        {state.status === 'submitting' && (
          <form onSubmit={handleSubmit} className="feedback-form">
            <label htmlFor="feedback">Your Feedback:</label>
            <textarea
              id="feedback"
              value={inputFeedback}
              onChange={(e) => setInputFeedback(e.target.value)}
              placeholder="Type your feedback here..."
              rows={4}
            />
            <div className="form-actions">
                <button type="submit" disabled={!inputFeedback.trim()}>Submit Feedback</button>
                <button type="button" onClick={() => dispatch({ type: 'RESET_SURVEY' })} className="secondary">Cancel</button>
            </div>
          </form>
        )}

        {state.status === 'completed' && (
          <div className="completed-view">
            <h3>Thank you for your feedback!</h3>
            <p>Here is what you submitted:</p>
            <blockquote className="feedback-quote">"{state.feedback}"</blockquote>
            <button onClick={() => dispatch({ type: 'RESET_SURVEY' })}>
              Start New Survey
            </button>
          </div>
        )}
        
        <div className="debug-info">
            <small>Current Status: {state.status}</small>
        </div>
      </div>
    </div>
  );
};

export default Exercise2_SurveyFeedback;
