const express = require('express');
const bcrypt = require('bcrypt');
const { readUsers, writeUsers } = require('../utils/fileHandler');

const router = express.Router();
const SALT_ROUNDS = 10;

// Helper: Find user index by username or ID
const findUserByUsername = (users, username) => users.findIndex(u => u.username === username);
const findUserById = (users, id) => users.findIndex(u => u.id === parseInt(id));

// POST /register
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const users = await readUsers();

    // Check if username already exists
    if (findUserByUsername(users, username) !== -1) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create new user
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      username: username.trim(),
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await writeUsers(users);

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.id, username: newUser.username, firstName: newUser.firstName }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const users = await readUsers();
    const userIndex = findUserByUsername(users, username);

    if (userIndex === -1) {
      return res.status(401).json({ error: 'Username is not registered' });
    }

    const user = users[userIndex];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    res.json({
      message: 'Login successful',
      user: { id: user.id, username: user.username, firstName: user.firstName }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all users (demo only)
router.get('/', async (req, res) => {
  try {
    const users = await readUsers();
    // Hide password in response
    const safeUsers = users.map(({ password, ...user }) => user);
    res.json(safeUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET user by ID
router.get('/:id', async (req, res) => {
  try {
    const users = await readUsers();
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    const { password, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update user by ID
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const id = parseInt(req.params.id);

    const users = await readUsers();
    const index = findUserById(users, id);

    if (index === -1) return res.status(404).json({ error: 'User not found' });

    // If updating password, hash it
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, SALT_ROUNDS);
    }

    users[index] = { ...users[index], ...updates, updatedAt: new Date().toISOString() };
    await writeUsers(users);

    const { password, ...safeUser } = users[index];
    res.json(safeUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;