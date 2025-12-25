const express = require("express");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
app.use(express.json());

// Routes
app.use(todoRoutes);

// Invalid route handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Server error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Server error" });
});

app.listen(3000, () => {
  console.log("✅ Todo API running on port 3000");
});
