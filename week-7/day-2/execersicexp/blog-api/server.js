const express = require("express");
const app = express();
const postsRoutes = require("./server/routes/postsRoutes");

app.use(express.json());

// Routes
app.use("/posts", postsRoutes);

// Invalid route handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Server error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
