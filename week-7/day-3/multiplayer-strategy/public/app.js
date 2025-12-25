let gameId = null;
let player = "player1";

async function startGame() {
    const res = await fetch("http://localhost:3000/api/game/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player1: "player1", player2: "player2" })
    });
    const data = await res.json();
    gameId = data.id;
    renderGrid(data);
}

async function move(direction) {
    const res = await fetch("http://localhost:3000/api/game/move", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId, player, direction })
    });
    const data = await res.json();
    renderGrid(data);
}

function renderGrid(game) {
    const gridDiv = document.getElementById("grid");
    gridDiv.innerHTML = '';
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            if (game.players.player1.x === x && game.players.player1.y === y) cell.classList.add("player");
            if (game.players.player2.x === x && game.players.player2.y === y) cell.classList.add("player");
            if ((game.players.player1.baseX === x && game.players.player1.baseY === y) ||
                (game.players.player2.baseX === x && game.players.player2.baseY === y)) cell.classList.add("base");
            gridDiv.appendChild(cell);
        }
    }
}

startGame();
