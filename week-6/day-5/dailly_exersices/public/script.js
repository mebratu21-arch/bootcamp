let currentQuestion = null;
let playerName = prompt("Enter your name:");

async function loadQuestion() {
  const res = await fetch("/api/question");
  currentQuestion = await res.json();

  const container = document.getElementById("game-container");
  container.innerHTML = `
    <h2>${currentQuestion.emoji}</h2>
    ${currentQuestion.options.map(opt => 
      `<button onclick="submitGuess('${opt}')">${opt}</button>`
    ).join("")}
  `;
}

async function submitGuess(guess) {
  const res = await fetch("/api/guess", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ guess, answer: currentQuestion.answer, player: playerName })
  });

  const result = await res.json();
  document.getElementById("feedback").innerText = result.correct ? "✅ Correct!" : "❌ Wrong!";
  document.getElementById("score").innerText = `Score: ${result.score}`;
  loadLeaderboard();
  setTimeout(loadQuestion, 1000);
}

async function loadLeaderboard() {
  const res = await fetch("/api/leaderboard");
  const leaderboard = await res.json();
  const list = document.getElementById("leaderboard");
  list.innerHTML = leaderboard.map(p => `<li>${p.player}: ${p.score}</li>`).join("");
}

loadQuestion();
