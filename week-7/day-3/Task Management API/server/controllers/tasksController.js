const Task = require("../models/tasksModel");

exports.getAllTasks = (req, res) => {
  const tasks = Task.getAll();
  res.json(tasks);
};

exports.getTaskById = (req, res) => {
  const task = Task.getById(req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
};

exports.createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = Task.create(title, description || "");
  res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
  const { title, description, completed } = req.body;

  const updated = Task.update(req.params.id, {
    title,
    description,
    completed
  });

  if (!updated) return res.status(404).json({ error: "Task not found" });

  res.json(updated);
};

exports.deleteTask = (req, res) => {
  const task = Task.getById(req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  Task.remove(req.params.id);
  res.json({ message: "Task deleted" });
};
