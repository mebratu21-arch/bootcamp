const express = require("express");
const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/", postRoutes);

// Invalid route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Server error
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Server error" });
});

app.listen(3000, () => {
  console.log("🚀 Blog API running on port 3000");
});
