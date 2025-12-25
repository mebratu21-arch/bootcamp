let currentQuestion = 1;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next");
const scoreEl = document.getElementById("score");

async function loadQuestion(id) {
  const res = await fetch(`http://localhost:3000/api/questions/${id}`);
  if (!res.ok) {
    questionEl.textContent = "Quiz finished!";
    optionsEl.innerHTML = "";
    scoreEl.textContent = `Your final score: ${score}`;
    nextBtn.style.display = "none";
    return;
  }
  const question = await res.json();
  questionEl.textContent = question.question;
  optionsEl.innerHTML = "";
  question.options.forEach(opt => {
    const li = document.createElement("li");
    li.textContent = opt.option_text;
    li.onclick = () => submitAnswer(opt.id);
    optionsEl.appendChild(li);
  });
}

async function submitAnswer(answer_id) {
  const res = await fetch(`http://localhost:3000/api/questions/${currentQuestion}/answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer_id })
  });
  const data = await res.json();
  if (data.correct) score++;
  scoreEl.textContent = `Score: ${score}`;
}

nextBtn.onclick = () => {
  currentQuestion++;
  loadQuestion(currentQuestion);
};

loadQuestion(currentQuestion);
