const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Task Management API running on http://localhost:${PORT}`);
  console.log(` Data stored in: data/tasks.json`);
});