const express = require('express');
const app = express();

app.use(express.json());

// Import router
const todosRouter = require('./routes/todos');

// Mount router
app.use('/todos', todosRouter);

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
