const { createNewGame, getGameById } = require('../models/gameModel');

function startGame(req, res) {
    const { player1, player2 } = req.body;
    const game = createNewGame(player1, player2);
    res.json(game);
}

function makeMove(req, res) {
    const { gameId, player, direction } = req.body;
    const game = getGameById(gameId);

    if (!game) return res.status(404).send("Game not found");
    if (game.currentTurn !== player) return res.status(400).send("Not your turn");

    let { x, y } = game.players[player];
    if (direction === "up") y -= 1;
    else if (direction === "down") y += 1;
    else if (direction === "left") x -= 1;
    else if (direction === "right") x += 1;

    // Validate move
    if (x < 0 || x >= 10 || y < 0 || y >= 10) return res.status(400).send("Invalid move");

    game.players[player].x = x;
    game.players[player].y = y;

    // Check win
    const opponent = Object.keys(game.players).find(p => p !== player);
    const oppBase = game.players[opponent];
    if (x === oppBase.baseX && y === oppBase.baseY) {
        game.winner = player;
    }

    // Switch turn
    game.currentTurn = opponent;
    res.json(game);
}

module.exports = { startGame, makeMove };
