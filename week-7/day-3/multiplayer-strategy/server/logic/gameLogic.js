function isAdjacent(a, b) {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  return dx + dy === 1;
}

function isInsideBoard(x, y, size) {
  return x >= 0 && x < size && y >= 0 && y < size;
}

function isObstacle(x, y, obstacles) {
  return obstacles.some((o) => o.x === x && o.y === y);
}

function makeMove(game, playerId, direction) {
  if (game.winner) {
    return { error: "Game already finished", game };
  }

  if (game.turn !== playerId) {
    return { error: "Not your turn", game };
  }

  const player = game.players[playerId];
  if (!player) {
    return { error: "Invalid player", game };
  }

  let { x, y } = player;

  if (direction === "up") y -= 1;
  if (direction === "down") y += 1;
  if (direction === "left") x -= 1;
  if (direction === "right") x += 1;

  if (!isInsideBoard(x, y, game.size)) {
    return { error: "Move out of bounds", game };
  }

  if (isObstacle(x, y, game.obstacles)) {
    return { error: "Cannot move through obstacle", game };
  }

  player.x = x;
  player.y = y;

  const opponentId = Object.keys(game.players).find((id) => id !== playerId);
  const opponent = game.players[opponentId];

  if (x === opponent.base.x && y === opponent.base.y) {
    game.winner = playerId;
    return { game, message: "Base captured! You win!" };
  }

  if (isAdjacent(player, opponent.base)) {
    game.winner = playerId;
    return { game, message: "You attacked and captured the base! You win!" };
  }

  game.turn = opponentId;

  return { game };
}

module.exports = {
  makeMove
};
