const db = require("../config/db");

// Get all posts
const getAllPosts = () => {
  return db.query("SELECT * FROM posts");
};

// Get post by ID
const getPostById = (id) => {
  return db.query("SELECT * FROM posts WHERE id = $1", [id]);
};

// Create post
const createPost = (title, content) => {
  return db.query(
    "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *",
    [title, content]
  );
};

// Update post
const updatePost = (id, title, content) => {
  return db.query(
    "UPDATE posts SET title=$1, content=$2 WHERE id=$3 RETURNING *",
    [title, content, id]
  );
};

// Delete post
const deletePost = (id) => {
  return db.query("DELETE FROM posts WHERE id=$1", [id]);
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
