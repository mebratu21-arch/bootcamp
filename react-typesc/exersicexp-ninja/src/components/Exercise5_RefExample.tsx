import React, { useRef, useEffect } from 'react';

// 1. Set Up a useRef Reference
const Exercise5_RefExample: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 2. Access the DOM Element on Component Mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 3. Handle a Button Click to Focus the Input
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      // Optional: Add a visual indicator
      inputRef.current.style.backgroundColor = '#f0f8ff';
      setTimeout(() => {
          if(inputRef.current) inputRef.current.style.backgroundColor = '';
      }, 500);
    }
  };

  return (
    <div className="exercise-container">
      <h2>Exercise 5: useRef DOM Manipulation</h2>
      
      <div className="card">
        <div className="form-group">
          <label htmlFor="focusInput">Focus Me:</label>
          <input
            ref={inputRef}
            type="text"
            id="focusInput"
            placeholder="I will be focused on load"
          />
        </div>

        <button onClick={handleClick}>
          Focus Input Manually
        </button>
        
        <p className="info-text">
            <small>Clicking the button will focus the input field above.</small>
        </p>
      </div>
    </div>
  );
};

export default Exercise5_RefExample;
