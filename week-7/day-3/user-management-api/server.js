const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` User Management API running on http://localhost:${PORT}`);
  console.log(` Register: http://localhost:${PORT}/register.html`);
  console.log(` Login:    http://localhost:${PORT}/login.html`);
});