const express = require('express');
const router = express.Router();

// In-memory database
let posts = [];
let idCounter = 1;

// GET all posts
router.get('/', (req, res) => {
  res.json(posts);
});

// GET a single post by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json(post);
});

// CREATE a new post
router.post('/', (req, res) => {
  const { title, content } = req.body;

  // Validation
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const newPost = {
    id: idCounter++,
    title,
    content,
    timestamp: new Date().toISOString()
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// UPDATE a post by ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const { title, content } = req.body;

  if (!title && !content) {
    return res.status(400).json({ message: 'Nothing to update' });
  }

  post.title = title ?? post.title;
  post.content = content ?? post.content;
  post.timestamp = new Date().toISOString();

  res.json(post);
});

// DELETE a post by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const exists = posts.some(p => p.id === id);

  if (!exists) {
    return res.status(404).json({ message: 'Post not found' });
  }

  posts = posts.filter(p => p.id !== id);
  res.json({ message: 'Post deleted successfully' });
});

module.exports = router;
