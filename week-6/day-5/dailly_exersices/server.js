const express = require("express");
const path = require("path");
const emojis = require("./emojis");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let leaderboard = [];
let score = 0;

// Utility: get random emoji with options
function getRandomEmoji() {
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  const options = [randomEmoji.name];

  // Add distractors
  while (options.length < 4) {
    const randomOption = emojis[Math.floor(Math.random() * emojis.length)].name;
    if (!options.includes(randomOption)) {
      options.push(randomOption);
    }
  }

  // Shuffle options
  options.sort(() => Math.random() - 0.5);

  return { emoji: randomEmoji.emoji, answer: randomEmoji.name, options };
}

// Endpoint: get new question
app.get("/api/question", (req, res) => {
  res.json(getRandomEmoji());
});

// Endpoint: submit guess
app.post("/api/guess", (req, res) => {
  const { guess, answer, player } = req.body;
  let correct = false;

  if (guess === answer) {
    score++;
    correct = true;
  }

  // Update leaderboard
  if (player) {
    const existing = leaderboard.find(p => p.player === player);
    if (existing) {
      existing.score = score;
    } else {
      leaderboard.push({ player, score });
    }
  }

  res.json({ correct, score });
});

// Endpoint: leaderboard
app.get("/api/leaderboard", (req, res) => {
  const sorted = leaderboard.sort((a, b) => b.score - a.score);
  res.json(sorted);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Emoji Game running on http://localhost:${PORT}`));
