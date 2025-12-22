const { v4: uuidv4 } = require("uuid");

const users = []; // { id, username, password }
const games = {}; // gameId -> gameState

function createUser(username, password) {
  const user = { id: uuidv4(), username, password };
  users.push(user);
  return user;
}

function findUser(username, password) {
  return users.find((u) => u.username === username && u.password === password);
}

function createGame(player1Id, player2Id) {
  const gameId = uuidv4();

  const size = 10;
  const grid = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ type: "empty" }))
  );

  const state = {
    id: gameId,
    size,
    players: {
      [player1Id]: { x: 0, y: 0, base: { x: 0, y: 0 } },
      [player2Id]: { x: size - 1, y: size - 1, base: { x: size - 1, y: size - 1 } }
    },
    obstacles: [
      { x: 4, y: 4 },
      { x: 5, y: 5 },
      { x: 2, y: 7 }
    ],
    turn: player1Id,
    winner: null
  };

  state.obstacles.forEach((o) => {
    grid[o.y][o.x].type = "obstacle";
  });

  state.grid = grid;

  games[gameId] = state;
  return state;
}

function getGame(gameId) {
  return games[gameId];
}

function updateGame(gameId, gameState) {
  games[gameId] = gameState;
}

module.exports = {
  createUser,
  findUser,
  createGame,
  getGame,
  updateGame
};
