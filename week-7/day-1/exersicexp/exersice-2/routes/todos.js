const express = require('express');
const router = express.Router();

// In-memory database
let todos = [];
let idCounter = 1;

// Get all todos
router.get('/', (req, res) => {
  res.json(todos);
});

// Add new todo
router.post('/', (req, res) => {
  const newTodo = {
    id: idCounter++,
    title: req.body.title,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update todo by ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  todo.title = req.body.title ?? todo.title;
  todo.completed = req.body.completed ?? todo.completed;

  res.json(todo);
});

// Delete todo by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.json({ message: 'Todo deleted' });
});

module.exports = router;
