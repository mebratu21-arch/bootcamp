const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/tasks', taskRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Task Management API',
    version: '1.0.0',
    endpoints: {
      'GET /tasks': 'Get all tasks',
      'GET /tasks/:id': 'Get a specific task',
      'POST /tasks': 'Create a new task',
      'PUT /tasks/:id': 'Update a task',
      'DELETE /tasks/:id': 'Delete a task'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.url}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Task Management API Server`);
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`📝 Ready to manage your tasks!\n`);
});
