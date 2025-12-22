const Todo = require("../models/todosModel");

exports.getAllTodos = async (req, res) => {
  const result = await Todo.getAll();
  res.json(result.rows);
};

exports.getTodoById = async (req, res) => {
  const result = await Todo.getById(req.params.id);
  if (result.rows.length === 0)
    return res.status(404).json({ error: "Todo not found" });

  res.json(result.rows[0]);
};

exports.createTodo = async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const result = await Todo.create(title);
  res.status(201).json(result.rows[0]);
};

exports.updateTodo = async (req, res) => {
  const { title, completed } = req.body;

  const result = await Todo.update(req.params.id, title, completed);
  if (result.rows.length === 0)
    return res.status(404).json({ error: "Todo not found" });

  res.json(result.rows[0]);
};

exports.deleteTodo = async (req, res) => {
  await Todo.remove(req.params.id);
  res.json({ message: "Todo deleted" });
};
