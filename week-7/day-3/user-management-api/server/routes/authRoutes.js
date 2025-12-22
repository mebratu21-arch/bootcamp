const express = require("express");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { readUsers, writeUsers } = require("../utils/fileHandler");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, lastName, email, username, password } = req.body;
  if (!name || !lastName || !email || !username || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const users = readUsers();
  const exists = users.find(u => u.username === username || u.password === password);
  if (exists) {
    return res.status(409).json({ message: "error1" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: uuidv4(),
    name,
    lastName,
    email,
    username,
    password: hashedPassword
  };

  users.push(newUser);
  writeUsers(users);
  res.json({ message: "register" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ message: "error2" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "error2" });
  }

  res.json({ message: `login`, user: { name: user.name, username: user.username } });
});

module.exports = router;
