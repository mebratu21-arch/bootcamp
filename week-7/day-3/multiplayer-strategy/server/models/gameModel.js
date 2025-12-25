const GRID_SIZE = 10;

let games = []; // Stores multiple game sessions

function createNewGame(player1, player2) {
    const game = {
        id: games.length + 1,
        grid: Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(null)),
        players: {
            [player1]: { x: 0, y: 0, baseX: 0, baseY: 0 },
            [player2]: { x: GRID_SIZE-1, y: GRID_SIZE-1, baseX: GRID_SIZE-1, baseY: GRID_SIZE-1 },
        },
        currentTurn: player1,
        winner: null
    };
    games.push(game);
    return game;
}

function getGameById(id) {
    return games.find(g => g.id === id);
}

module.exports = { createNewGame, getGameById };
