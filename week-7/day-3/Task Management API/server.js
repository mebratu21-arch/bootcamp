const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());
app.use('/api', taskRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
