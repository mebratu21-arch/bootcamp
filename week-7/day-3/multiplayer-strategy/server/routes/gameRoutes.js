const express = require("express");
const router = express.Router();
const { createGame, getGame, updateGame } = require("../data/gameStore");
const { makeMove } = require("../logic/gameLogic");

// Start a new game: expects two player IDs
router.post("/start", (req, res) => {
  const { player1Id, player2Id } = req.body;
  if (!player1Id || !player2Id) {
    return res.status(400).json({ error: "player1Id and player2Id are required" });
  }
  const game = createGame(player1Id, player2Id);
  res.json(game);
});

// Get game state
router.get("/:gameId", (req, res) => {
  const game = getGame(req.params.gameId);
  if (!game) return res.status(404).json({ error: "Game not found" });
  res.json(game);
});

// Make a move
router.post("/:gameId/move", (req, res) => {
  const { playerId, direction } = req.body;
  const game = getGame(req.params.gameId);
  if (!game) return res.status(404).json({ error: "Game not found" });

  if (!["up", "down", "left", "right"].includes(direction)) {
    return res.status(400).json({ error: "Invalid direction" });
  }

  const result = makeMove(game, playerId, direction);
  updateGame(game.id, result.game);

  if (result.error) {
    return res.status(400).json({ error: result.error, game: result.game });
  }

  res.json({ game: result.game, message: result.message });
});

module.exports = router;
