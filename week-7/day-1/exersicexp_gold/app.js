const express = require('express');
const app = express();

app.use(express.json());

// Import router
const postsRouter = require('./routes/posts');

// Mount router
app.use('/posts', postsRouter);

// Start server
app.listen(3000, () => {
  console.log('Blog API running on http://localhost:3000');
});
