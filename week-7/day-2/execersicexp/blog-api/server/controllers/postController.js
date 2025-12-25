const Post = require("../models/postModel");

// GET /posts
exports.getPosts = async (req, res) => {
  const result = await Post.getAllPosts();
  res.json(result.rows);
};

// GET /posts/:id
exports.getPost = async (req, res) => {
  const result = await Post.getPostById(req.params.id);
  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json(result.rows[0]);
};

// POST /posts
exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const result = await Post.createPost(title, content);
  res.status(201).json(result.rows[0]);
};

// PUT /posts/:id
exports.updatePost = async (req, res) => {
  const { title, content } = req.body;
  const result = await Post.updatePost(req.params.id, title, content);
  res.json(result.rows[0]);
};

// DELETE /posts/:id
exports.deletePost = async (req, res) => {
  await Post.deletePost(req.params.id);
  res.json({ message: "Post deleted" });
};
