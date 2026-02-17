import React, { useReducer } from 'react';

// 1. Define State and Action Types
type UserProfile = {
  name: string;
  bio: string;
};

type State = {
  status: 'initial' | 'loading' | 'success' | 'error';
  profile: UserProfile | null;
  error: string | null;
};

type Action =
  | { type: 'SET_LOADING' }
  | { type: 'UPDATE_PROFILE'; payload: UserProfile }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'RESET' };

// 2. Set Up Initial State
const initialState: State = {
  status: 'initial',
  profile: null,
  error: null,
};

// 3. Create the Reducer Function
const profileReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, status: 'loading', error: null };
    case 'UPDATE_PROFILE':
      return { ...state, status: 'success', profile: action.payload, error: null };
    case 'SET_ERROR':
      return { ...state, status: 'error', error: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

// 4. Use the Reducer in a Component
const Exercise1_UserProfile: React.FC = () => {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  const handleUpdateProfile = () => {
    dispatch({ type: 'SET_LOADING' });
    
    // Simulate API call
    setTimeout(() => {
      // Randomly succeed or fail for demonstration
      const randomSuccess = Math.random() > 0.3;
      
      if (randomSuccess) {
        dispatch({
          type: 'UPDATE_PROFILE',
          payload: { name: 'John Doe', bio: 'Software Developer' }
        });
      } else {
        dispatch({
          type: 'SET_ERROR',
          payload: 'Failed to update profile. Please try again.'
        });
      }
    }, 1500);
  };

  const forceError = () => {
      dispatch({ type: 'SET_LOADING' });
      setTimeout(() => {
          dispatch({
              type: 'SET_ERROR',
              payload: 'Forced error occurred!'
          });
      }, 1000);
  }

  return (
    <div className="exercise-container">
      <h2>Exercise 1: User Profile</h2>
      
      <div className="card">
        <div className="actions">
          <button onClick={handleUpdateProfile} disabled={state.status === 'loading'}>
            {state.status === 'loading' ? 'Updating...' : 'Update Profile'}
          </button>
           <button onClick={forceError} disabled={state.status === 'loading'} style={{marginLeft: '10px', backgroundColor: '#e74c3c'}}>
            Simulate Error
          </button>
          {state.status !== 'initial' && (
             <button onClick={() => dispatch({ type: 'RESET' })} style={{marginLeft: '10px', backgroundColor: '#95a5a6'}}>
                Reset
             </button>
          )}
        </div>

        <div className="status-display">
          <p>Status: <span className={`status-${state.status}`}>{state.status}</span></p>
          
          {state.status === 'loading' && <p>Loading data...</p>}
          
          {state.status === 'success' && state.profile && (
            <div className="profile-details">
              <h3>Profile Updated!</h3>
              <p><strong>Name:</strong> {state.profile.name}</p>
              <p><strong>Bio:</strong> {state.profile.bio}</p>
            </div>
          )}
          
          {state.status === 'error' && (
            <div className="error-message">
              <p>Error: {state.error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercise1_UserProfile;
