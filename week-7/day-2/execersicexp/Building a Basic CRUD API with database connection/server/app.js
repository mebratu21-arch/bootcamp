const express = require("express");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
app.use(express.json());
app.use(bookRoutes);

app.listen(5000, () => {
  console.log("📚 Book API running on port 5000");
});
