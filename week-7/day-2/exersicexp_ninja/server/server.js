const express = require("express");
const cors = require("cors");
const quizRoutes = require("./routes/quizRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // serve frontend

app.use(quizRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Server error" });
});

app.listen(3000, () => console.log("🧩 Quiz Game API running on port 3000"));
