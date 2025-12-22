let currentUser = null;
let currentGame = null;

document.getElementById("register-btn").addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (res.ok) {
    currentUser = data;
    document.getElementById("auth-status").innerText =
      `Registered as ${data.username} (id: ${data.userId})`;
  } else {
    document.getElementById("auth-status").innerText = data.error || "Error";
  }
});

document.getElementById("login-btn").addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (res.ok) {
    currentUser = data;
    document.getElementById("auth-status").innerText =
      `Logged in as ${data.username} (id: ${data.userId})`;
  } else {
    document.getElementById("auth-status").innerText = data.error || "Error";
  }
});

document.getElementById("start-game-btn").addEventListener("click", async () => {
  if (!currentUser) {
    alert("Login or register first");
    return;
  }
  const opponentId = document.getElementById("opponent-id").value.trim();
  const res = await fetch("/api/game/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ player1Id: currentUser.userId, player2Id: opponentId })
  });
  const data = await res.json();
  if (!res.ok) {
    alert(data.error || "Error starting game");
    return;
  }
  currentGame = data;
  document.getElementById("game-id-display").innerText = `Game ID: ${data.id}`;
  renderBoard();
  updateInfo();
});

document.querySelectorAll("#controls button").forEach((btn) => {
  btn.addEventListener("click", async () => {
    if (!currentGame || !currentUser) return;
    const direction = btn.getAttribute("data-dir");

    const res = await fetch(`/api/game/${currentGame.id}/move`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerId: currentUser.userId, direction })
    });
    const data = await res.json();
    if (!res.ok) {
      document.getElementById("message").innerText = data.error;
      return;
    }
    currentGame = data.game;
    document.getElementById("message").innerText = data.message || "";
    renderBoard();
    updateInfo();
  });
});

async function renderBoard() {
  const boardDiv = document.getElementById("board");
  boardDiv.innerHTML = "";
  const size = currentGame.size;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (currentGame.obstacles.some((o) => o.x === x && o.y === y)) {
        cell.classList.add("obstacle");
      }

      const players = Object.entries(currentGame.players);
      players.forEach(([id, p]) => {
        if (p.base.x === x && p.base.y === y) {
          cell.classList.add("base");
        }
        if (p.x === x && p.y === y) {
          if (id === currentUser?.userId) {
            cell.classList.add("player");
          } else {
            cell.classList.add("opponent");
          }
        }
      });

      boardDiv.appendChild(cell);
    }
  }
}

function updateInfo() {
  if (!currentGame || !currentUser) return;
  const turnInfo = document.getElementById("turn-info");
  if (currentGame.winner) {
    const winnerText =
      currentGame.winner === currentUser.userId ? "You won!" : "You lost.";
    turnInfo.innerText = `Game over: ${winnerText}`;
  } else {
    const yourTurn = currentGame.turn === currentUser.userId;
    turnInfo.innerText = yourTurn ? "Your turn" : "Opponent's turn";
  }
}
