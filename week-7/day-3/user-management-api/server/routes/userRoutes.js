const express = require("express");
const { readUsers, writeUsers } = require("../utils/fileHandler");

const router = express.Router();

router.get("/", (req, res) => {
  const users = readUsers();
  res.json(users);
});

router.get("/:id", (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

router.put("/:id", (req, res) => {
  const users = readUsers();
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  users[index] = { ...users[index], ...req.body };
  writeUsers(users);
  res.json(users[index]);
});

module.exports = router;
