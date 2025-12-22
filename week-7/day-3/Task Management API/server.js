const express = require("express");
const tasksRoutes = require("./server/routes/tasksRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/tasks", tasksRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(3000, () => {
  console.log("Task API running on port 3000");
});
