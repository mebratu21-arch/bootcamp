const express = require("express");
const path = require("path");

const authRoutes = require("./server/routes/authRoutes");
const userRoutes = require("./server/routes/userRoutes");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
