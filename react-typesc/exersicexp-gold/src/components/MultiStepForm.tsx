import { useReducer } from 'react';
import { FormState } from '../types';

type Action =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_FIELD'; field: keyof FormState['formData']; value: string }
  | { type: 'SET_ERRORS'; errors: FormState['errors'] };

const initialState: FormState = {
  step: 1,
  formData: { name: '', email: '', address: '', city: '' },
  errors: {},
};

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, step: Math.min(state.step + 1, 3) as 1 | 2 | 3 };
    case 'PREV_STEP':
      return { ...state, step: Math.max(state.step - 1, 1) as 1 | 2 | 3 };
    case 'SET_FIELD':
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: undefined },
      };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    default:
      return state;
  }
}

const MultiStepForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const validate = () => {
    const newErrors: FormState['errors'] = {};
    if (state.step === 1) {
      if (!state.formData.name) newErrors.name = 'Name is required';
      if (!state.formData.email.includes('@')) newErrors.email = 'Invalid email';
    } else if (state.step === 2) {
      if (!state.formData.address) newErrors.address = 'Address is required';
      if (!state.formData.city) newErrors.city = 'City is required';
    }
    dispatch({ type: 'SET_ERRORS', errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validate()) dispatch({ type: 'NEXT_STEP' });
  };

  return (
    <div className="exercise-section">
      <h2>Gold Exercise 2: Multi-step Registration</h2>
      <div className="form-container">
        <div className="step-indicator">Step {state.step} of 3</div>
        
        {state.step === 1 && (
          <div className="step">
            <h3>Personal Info</h3>
            <input
              placeholder="Full Name"
              value={state.formData.name}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
            />
            {state.errors.name && <span className="error">{state.errors.name}</span>}
            <input
              placeholder="Email"
              value={state.formData.email}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
            />
            {state.errors.email && <span className="error">{state.errors.email}</span>}
          </div>
        )}

        {state.step === 2 && (
          <div className="step">
            <h3>Address Details</h3>
            <input
              placeholder="Street Address"
              value={state.formData.address}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'address', value: e.target.value })}
            />
            {state.errors.address && <span className="error">{state.errors.address}</span>}
            <input
              placeholder="City"
              value={state.formData.city}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'city', value: e.target.value })}
            />
            {state.errors.city && <span className="error">{state.errors.city}</span>}
          </div>
        )}

        {state.step === 3 && (
          <div className="step confirmation">
            <h3>Confirmation</h3>
            <p><strong>Name:</strong> {state.formData.name}</p>
            <p><strong>Email:</strong> {state.formData.email}</p>
            <p><strong>Address:</strong> {state.formData.address}, {state.formData.city}</p>
            <button className="submit" onClick={() => alert('Form Submitted!')}>Finalize Registration</button>
          </div>
        )}

        <div className="controls">
          {state.step > 1 && <button onClick={() => dispatch({ type: 'PREV_STEP' })}>Back</button>}
          {state.step < 3 && <button onClick={next}>Next</button>}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
