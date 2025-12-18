const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

let todos = [];

// Create Todo
app.post("/api/todos", (req, res) => {
  const newTodo = { id: uuidv4(), title: req.body.title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Get All Todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// Get Todo by ID
app.get("/api/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json(todo);
});

// Update Todo
app.put("/api/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  todo.title = req.body.title || todo.title;
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
  res.json(todo);
});

// Delete Todo
app.delete("/api/todos/:id", (req, res) => {
  const index = todos.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Todo not found" });

  const deleted = todos.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(5000, () => console.log("Todo API running on port 5000"));
