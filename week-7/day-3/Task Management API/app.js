const express = require('express');
const tasksRouter = require('./routes/tasks');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/tasks', tasksRouter);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Task Management API',
    endpoints: {
      'GET /tasks': 'List all tasks',
      'GET /tasks/:id': 'Get task by ID',
      'POST /tasks': 'Create new task',
      'PUT /tasks/:id': 'Update task',
      'DELETE /tasks/:id': 'Delete task'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;