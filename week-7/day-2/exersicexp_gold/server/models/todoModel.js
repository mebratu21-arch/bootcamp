const db = require("../config/db");

// Get all todos
const getAllTodos = () => {
  return db.query("SELECT * FROM tasks ORDER BY id ASC");
};

// Get todo by ID
const getTodoById = (id) => {
  return db.query("SELECT * FROM tasks WHERE id = $1", [id]);
};

// Create a new todo
const createTodo = (title) => {
  return db.query(
    "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
    [title]
  );
};

// Update a todo
const updateTodo = (id, title, completed) => {
  return db.query(
    "UPDATE tasks SET title=$1, completed=$2 WHERE id=$3 RETURNING *",
    [title, completed, id]
  );
};

// Delete a todo
const deleteTodo = (id) => {
  return db.query("DELETE FROM tasks WHERE id=$1", [id]);
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
