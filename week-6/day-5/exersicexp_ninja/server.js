const express = require("express");
const path = require("path");
const questions = require("./data/questions");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to get all questions
app.get("/api/questions", (req, res) => {
  res.json(questions);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Quiz Game running on http://localhost:${PORT}`));
