const express = require("express");
const app = express();
const todosRoutes = require("./server/routes/todosRoutes");

app.use(express.json());

// Routes
app.use("/api/todos", todosRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
