const express = require("express");
const path = require("path");
const quizRoutes = require("./server/routes/quizRoutes");

const app = express();
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/quiz", quizRoutes);

app.listen(3000, () => {
  console.log("Quiz server running on port 3000");
});
