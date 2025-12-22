let currentQuestion = 1;
let score = 0;

async function loadQuestion() {
    const res = await fetch(`/api/quiz/${currentQuestion}`);
    const data = await res.json();

    if (!data.question) {
        document.getElementById("quiz-container").innerHTML =
            `<h2>Quiz Finished!</h2><p>Your score: ${score}</p>`;
        return;
    }

    document.getElementById("question").innerText = data.question.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    data.options.forEach(opt => {
        optionsDiv.innerHTML += `
            <label>
                <input type="radio" name="option" value="${opt.id}">
                ${opt.option}
            </label><br>
        `;
    });
}

document.getElementById("submit").addEventListener("click", async () => {
    const selected = document.querySelector("input[name='option']:checked");

    if (!selected) {
        alert("Please select an answer");
        return;
    }

    const res = await fetch("/api/quiz/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            questionId: currentQuestion,
            selectedOption: selected.value
        })
    });

    const result = await res.json();

    if (result.correct) {
        score++;
        document.getElementById("feedback").innerText = "Correct!";
    } else {
        document.getElementById("feedback").innerText = "Wrong!";
    }

    document.getElementById("score").innerText = `Score: ${score}`;

    currentQuestion++;

    setTimeout(() => {
        document.getElementById("feedback").innerText = "";
        loadQuestion();
    }, 1000);
});

loadQuestion();
