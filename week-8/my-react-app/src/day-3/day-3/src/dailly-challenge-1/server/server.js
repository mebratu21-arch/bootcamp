const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Enable CORS for React app
app.use(express.json()); // Parse JSON bodies

// GET endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello From Express' });
});

// POST endpoint
app.post('/api/world', (req, res) => {
  const { input } = req.body;
  console.log('Received POST request with data:', req.body);
  
  const responseMessage = `I received your POST request. This is what you sent me: ${input}`;
  res.json({ message: responseMessage });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});