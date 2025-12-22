const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

// Import router
const quizRouter = require('./routes/quiz');

// Mount router
app.use('/', quizRouter);

// Start server
app.listen(3000, () => {
  console.log('Trivia Quiz running on http://localhost:3000');
});
