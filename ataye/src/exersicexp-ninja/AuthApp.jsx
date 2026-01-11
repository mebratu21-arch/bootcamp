import React, { useState } from 'react';
import { Provider, connect } from 'react-redux';
import store from './store';
import Login from './components/Login';
import Register from './components/Register';
import TodoApp from './components/TodoApp';
import './AuthApp.css';

const AuthContent = ({ isAuthenticated }) => {
  const [showLogin, setShowLogin] = useState(true);

  if (isAuthenticated) {
    return <TodoApp />;
  }

  return showLogin ? (
    <Login onSwitchToRegister={() => setShowLogin(false)} />
  ) : (
    <Register onSwitchToLogin={() => setShowLogin(true)} />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const ConnectedAuthContent = connect(mapStateToProps)(AuthContent);

const AuthApp = () => {
  return (
    <Provider store={store}>
      <ConnectedAuthContent />
    </Provider>
  );
};

export default AuthApp;
