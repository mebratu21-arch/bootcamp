const express = require('express');
const router = express.Router();

// Hard-coded trivia questions
const triviaQuestions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", answer: "Mars" },
  { question: "What is the largest mammal in the world?", answer: "Blue whale" }
];

// Quiz state (in-memory)
let currentIndex = 0;
let score = 0;

// GET /quiz → Start quiz or show current question
router.get('/quiz', (req, res) => {
  // If quiz finished
  if (currentIndex >= triviaQuestions.length) {
    return res.redirect('/quiz/score');
  }

  const currentQuestion = triviaQuestions[currentIndex].question;

  res.send(`
    <h1>Trivia Quiz</h1>
    <h2>Question ${currentIndex + 1}:</h2>
    <p>${currentQuestion}</p>

    <form action="/quiz" method="POST">
      <input type="text" name="answer" placeholder="Your answer" required />
      <button type="submit">Submit</button>
    </form>
  `);
});

// POST /quiz → Submit answer and move to next question
router.post('/quiz', (req, res) => {
  const userAnswer = req.body.answer.trim();
  const correctAnswer = triviaQuestions[currentIndex].answer;

  let feedback = "";

  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    score++;
    feedback = `<p style="color: green;">Correct! 🎉</p>`;
  } else {
    feedback = `<p style="color: red;">Incorrect! The correct answer was: <strong>${correctAnswer}</strong></p>`;
  }

  currentIndex++;

  // If quiz finished
  if (currentIndex >= triviaQuestions.length) {
    return res.send(`
      ${feedback}
      <a href="/quiz/score">See your final score</a>
    `);
  }

  // Show next question
  const nextQuestion = triviaQuestions[currentIndex].question;

  res.send(`
    ${feedback}
    <h2>Next Question:</h2>
    <p>${nextQuestion}</p>

    <form action="/quiz" method="POST">
      <input type="text" name="answer" placeholder="Your answer" required />
      <button type="submit">Submit</button>
    </form>
  `);
});

// GET /quiz/score → Show final score
router.get('/quiz/score', (req, res) => {
  const total = triviaQuestions.length;

  res.send(`
    <h1>Your Final Score</h1>
    <h2>${score} / ${total}</h2>

    <a href="/quiz">Play Again</a>
  `);

  // Reset quiz for next play
  currentIndex = 0;
  score = 0;
});

module.exports = router;
