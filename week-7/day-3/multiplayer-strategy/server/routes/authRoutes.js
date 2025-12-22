const express = require("express");
const router = express.Router();
const { createUser, findUser } = require("../data/gameStore");

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }
  const user = createUser(username, password);
  res.json({ userId: user.id, username: user.username });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = findUser(username, password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  res.json({ userId: user.id, username: user.username });
});

module.exports = router;
