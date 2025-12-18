let currentQuestionIndex = 0;
let score = 0;
let questions = [];

async function loadQuestions() {
  const res = await fetch("/api/questions");
  questions = await res.json();
  showQuestion();
}

function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    document.getElementById("quiz-container").innerHTML = "<h2>Quiz Finished!</h2>";
    document.getElementById("score-container").innerHTML = `<p>Your score: ${score}/${questions.length}</p>`;
    return;
  }

  const questionObj = questions[currentQuestionIndex];
  const container = document.getElementById("quiz-container");
  container.innerHTML = `
    <h3>${questionObj.question}</h3>
    ${questionObj.options.map(opt => `<button onclick="checkAnswer('${opt}')">${opt}</button>`).join("")}
  `;
}

function checkAnswer(selected) {
  const questionObj = questions[currentQuestionIndex];
  if (selected === questionObj.answer) {
    alert("Correct!");
    score++;
  } else {
    alert(`Wrong! The correct answer was: ${questionObj.answer}`);
  }
  currentQuestionIndex++;
  showQuestion();
}

loadQuestions();
