import React, { useState } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../actions';

const Register = ({ registerUser, error, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');

    if (!username.trim() || !password.trim()) {
      setLocalError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    if (password.length < 4) {
      setLocalError('Password must be at least 4 characters');
      return;
    }

    registerUser(username, password);
    
    // If registration successful, switch to login
    setTimeout(() => {
      if (!error) {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        onSwitchToLogin();
      }
    }, 100);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>📝 Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              id="username"
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              id="confirmPassword"
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
            />
          </div>
          {(error || localError) && (
            <div className="error-message">{error || localError}</div>
          )}
          <button type="submit" className="auth-btn">Register</button>
        </form>
        <p className="auth-switch">
          Already have an account? 
          <button onClick={onSwitchToLogin} className="link-btn">Login here</button>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.error
});

const mapDispatchToProps = { registerUser };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
