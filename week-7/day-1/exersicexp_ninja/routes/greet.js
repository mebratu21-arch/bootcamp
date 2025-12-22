const express = require('express');
const router = express.Router();

// List of available emojis
const emojis = ["😀", "🎉", "🌟", "🎈", "👋"];

// GET / → Show form
router.get('/', (req, res) => {
  let emojiOptions = emojis
    .map(e => `<option value="${e}">${e}</option>`)
    .join('');

  res.send(`
    <html>
      <head>
        <title>Emoji Greeting App</title>
        <style>
          body { 
            font-family: Arial; 
            background: #f0f0f0; 
            padding: 40px; 
            text-align: center;
          }
          form {
            background: white;
            padding: 20px;
            border-radius: 10px;
            display: inline-block;
          }
          input, select {
            padding: 10px;
            margin: 10px;
            width: 200px;
          }
          button {
            padding: 10px 20px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <h1>Emoji Greeting App</h1>
        <form action="/greet" method="POST">
          <input type="text" name="name" placeholder="Enter your name" required />
          <br>
          <select name="emoji">
            ${emojiOptions}
          </select>
          <br>
          <button type="submit">Greet Me</button>
        </form>
      </body>
    </html>
  `);
});

// POST /greet → Process form
router.post('/greet', (req, res) => {
  const { name, emoji } = req.body;

  // Validation
  if (!name || name.trim() === "") {
    return res.send(`
      <h2>Name is required!</h2>
      <a href="/">Go Back</a>
    `);
  }

  res.send(`
    <html>
      <head>
        <title>Your Greeting</title>
        <style>
          body { 
            font-family: Arial; 
            background: #fff3cd; 
            padding: 40px; 
            text-align: center;
          }
          h1 {
            font-size: 40px;
          }
        </style>
      </head>
      <body>
        <h1>${emoji} Hello, ${name}! ${emoji}</h1>
        <a href="/">Go Back</a>
      </body>
    </html>
  `);
});

module.exports = router;
