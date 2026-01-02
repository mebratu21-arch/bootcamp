const express = require('express');
const path = require('path');
const session = require('express-session');
const KnexSessionStore = require('connect-pg-simple')(session);
const bcrypt = require('bcryptjs');
const { db, initDb } = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session Configuration (using in-memory store for now)
app.use(session({
  secret: process.env.SESSION_SECRET || 'personalized-todo-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

// Initialize Database
initDb();

// Auth Middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) return next();
  res.redirect('/login');
};

// Routes
app.get('/login', (req, res) => {
  if (req.session.userId) return res.redirect('/');
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db('users').where({ username }).first();
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user.id;
      req.session.username = user.username;
      return res.redirect('/');
    }
    res.render('login', { error: 'Invalid username or password' });
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    res.status(500).send("Login failed");
  }
});

app.get('/register', (req, res) => {
  if (req.session.userId) return res.redirect('/');
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await db('users').where({ username }).first();
    if (existingUser) {
      return res.render('register', { error: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [userId] = await db('users').insert({ username, password: hashedPassword }).returning('id');
    req.session.userId = userId.id || userId; // Handle different returning formats
    req.session.username = username;
    res.redirect('/');
  } catch (err) {
    console.error("REGISTER ERROR:", err.message);
    res.status(500).send(`Registration failed: ${err.message}. <br><br><b>Tip:</b> If it says "Connection refused" or "database does not exist", check your .env file and ensure DATABASE_URL is correct.`);
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.get('/', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;
    
    // Fetch user's lists
    const lists = await db('lists').where({ user_id: userId }).orderBy('name');
    
    // Fetch user's tags
    const tags = await db('tags').where({ user_id: userId }).orderBy('name');
    
    // Fetch tasks with list details
    const tasks = await db('tasks')
      .leftJoin('lists', 'tasks.list_id', 'lists.id')
      .select('tasks.*', 'lists.name as list_name')
      .where('tasks.user_id', userId)
      .orderBy('tasks.created_at', 'desc');

    res.render('index', { 
      tasks, 
      lists, 
      tags, 
      username: req.session.username 
    });
  } catch (err) {
    console.error("PAGE LOAD ERROR:", err.message);
    res.status(500).send("Server Error");
  }
});

app.post('/add', isAuthenticated, async (req, res) => {
  const { title, description, priority, due_date, list_id } = req.body;
  if (!title) return res.redirect('/');
  try {
    await db('tasks').insert({
      title,
      description: description || null,
      priority: priority || 'medium',
      due_date: due_date || null,
      list_id: list_id || null,
      user_id: req.session.userId 
    });
    res.redirect('/');
  } catch (err) {
    console.error("ADD ERROR:", err.message);
    res.status(500).send("Server Error");
  }
});

app.post('/lists/add', isAuthenticated, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.redirect('/');
  try {
    await db('lists').insert({ name, user_id: req.session.userId });
    res.redirect('/');
  } catch (err) {
    console.error("ADD LIST ERROR:", err.message);
    res.status(500).send("Server Error");
  }
});

app.post('/tags/add', isAuthenticated, async (req, res) => {
  const { name, color } = req.body;
  if (!name) return res.redirect('/');
  try {
    await db('tags').insert({ name, color, user_id: req.session.userId });
    res.redirect('/');
  } catch (err) {
    console.error("ADD TAG ERROR:", err.message);
    res.status(500).send("Server Error");
  }
});

app.post('/tasks/update/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const task = await db('tasks').where({ id, user_id: req.session.userId }).first();
    if (task) {
      // Filter out empty values and prepare updates
      const filteredUpdates = {};
      if (updates.title) filteredUpdates.title = updates.title;
      if (updates.description !== undefined) filteredUpdates.description = updates.description || null;
      if (updates.priority) filteredUpdates.priority = updates.priority;
      if (updates.due_date) filteredUpdates.due_date = updates.due_date;
      if (updates.list_id !== undefined) filteredUpdates.list_id = updates.list_id || null;
      
      await db('tasks').where({ id }).update(filteredUpdates);
      
      // Handle both form submission and AJAX requests
      if (req.xhr || req.headers.accept?.includes('application/json')) {
        res.json({ success: true });
      } else {
        res.redirect('/');
      }
    } else {
      if (req.xhr || req.headers.accept?.includes('application/json')) {
        res.status(404).json({ success: false, message: 'Task not found' });
      } else {
        res.redirect('/');
      }
    }
  } catch (err) {
    console.error("UPDATE TASK ERROR:", err.message);
    if (req.xhr || req.headers.accept?.includes('application/json')) {
      res.status(500).json({ success: false, message: "Server Error" });
    } else {
      res.status(500).send("Server Error");
    }
  }
});

app.post('/toggle/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    const task = await db('tasks')
      .where({ id, user_id: req.session.userId })
      .first();
    if (task) {
      await db('tasks').where({ id }).update({ completed: !task.completed });
    }
    res.redirect('/');
  } catch (err) {
    console.error("TOGGLE ERROR:", err.message);
    res.status(500).send("Server Error");
  }
});

app.post('/delete/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    await db('tasks')
      .where({ id, user_id: req.session.userId })
      .del();
    res.redirect('/');
  } catch (err) {
    console.error("DELETE ERROR:", err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
