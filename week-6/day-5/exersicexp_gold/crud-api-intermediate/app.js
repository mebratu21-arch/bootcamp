const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// Read All Posts
app.get("/api/posts", async (req, res) => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  }
});

// Read Single Post
app.get("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error: error.message });
  }
});

// Create Post
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post("https://jsonplaceholder.typicode.com/posts", req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error: error.message });
  }
});

// Update Post
app.put("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error: error.message });
  }
});

// Delete Post
app.delete("/api/posts/:id", async (req, res) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error: error.message });
  }
});

app.listen(5000, () => console.log("CRUD API Intermediate running on port 5000"));
