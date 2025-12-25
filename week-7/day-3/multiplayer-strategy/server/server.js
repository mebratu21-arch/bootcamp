const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/game', gameRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
