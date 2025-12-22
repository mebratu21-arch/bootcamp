const pool = require("../config/db");

module.exports = {
  getAllPosts: () => pool.query("SELECT * FROM posts"),
  getPostById: (id) => pool.query("SELECT * FROM posts WHERE id = $1", [id]),
  createPost: (title, content) =>
    pool.query("INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *", [title, content]),
  updatePost: (id, title, content) =>
    pool.query("UPDATE posts SET title=$1, content=$2 WHERE id=$3 RETURNING *", [title, content, id]),
  deletePost: (id) => pool.query("DELETE FROM posts WHERE id=$1", [id]),
};
