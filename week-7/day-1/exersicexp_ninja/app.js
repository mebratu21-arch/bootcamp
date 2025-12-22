const express = require('express');
const app = express();
const path = require('path');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Import router
const greetRouter = require('./routes/greet');

// Mount router
app.use('/', greetRouter);

// Start server
app.listen(3000, () => {
  console.log('Emoji Greeting App running on http://localhost:3000');
});
