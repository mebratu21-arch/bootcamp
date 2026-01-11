import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions';

const Login = ({ loginUser, error, onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;
    loginUser(username, password);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>🔐 Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              id="username"
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
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
              placeholder="Enter password"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <p className="auth-switch">
          Don't have an account? 
          <button onClick={onSwitchToRegister} className="link-btn">Register here</button>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.error
});

const mapDispatchToProps = { loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
