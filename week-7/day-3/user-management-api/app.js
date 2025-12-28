const express = require('express');
const path = require('path');
const usersRouter = require('./routes/users');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/register', usersRouter);
app.use('/login', usersRouter);
app.use('/users', usersRouter);

// Home route - serve forms
app.get('/', (req, res) => {
  res.send(`
    <h2>User Management API</h2>
    <ul>
      <li><a href="/register.html">Register Form</a></li>
      <li><a href="/login.html">Login Form</a></li>
    </ul>
  `);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;