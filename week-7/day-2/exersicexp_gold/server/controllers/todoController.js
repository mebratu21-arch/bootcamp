const Todo = require("../models/todoModel");

// GET /api/todos
exports.getTodos = async (req, res) => {
  try {
    const result = await Todo.getAllTodos();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/todos/:id
exports.getTodo = async (req, res) => {
  try {
    const result = await Todo.getTodoById(req.params.id);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/todos
exports.createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const result = await Todo.createTodo(title);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/todos/:id
exports.updateTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;
    const result = await Todo.updateTodo(req.params.id, title, completed);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/todos/:id
exports.deleteTodo = async (req, res) => {
  try {
    const result = await Todo.deleteTodo(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
