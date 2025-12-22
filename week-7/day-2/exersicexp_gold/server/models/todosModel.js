const pool = require("../config/db");

module.exports = {
  getAll: () => pool.query("SELECT * FROM tasks ORDER BY id ASC"),

  getById: (id) =>
    pool.query("SELECT * FROM tasks WHERE id = $1", [id]),

  create: (title) =>
    pool.query(
      "INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *",
      [title, false]
    ),

  update: (id, title, completed) =>
    pool.query(
      "UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *",
      [title, completed, id]
    ),

  remove: (id) =>
    pool.query("DELETE FROM tasks WHERE id = $1", [id]),
};
