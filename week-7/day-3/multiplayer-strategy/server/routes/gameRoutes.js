const express = require('express');
const router = express.Router();
const { startGame, makeMove } = require('../controllers/gameController');

router.post('/start', startGame);
router.post('/move', makeMove);

module.exports = router;
