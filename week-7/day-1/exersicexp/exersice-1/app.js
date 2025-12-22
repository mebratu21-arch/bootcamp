const express = require('express');
const app = express();

// Import router
const indexRouter = require('./routes/index');

// Mount router
app.use('/', indexRouter);

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
