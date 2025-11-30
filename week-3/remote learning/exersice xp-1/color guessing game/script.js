const colorDisplay = document.getElementById("colorDisplay");
const optionsContainer = document.getElementById("options");
const feedback = document.getElementById("feedback");
const timerEl = document.getElementById("timer");

let difficulty = "medium"; // default
let countdown;

document.getElementById("easy").addEventListener("click", () => setDifficulty("easy"));
document.getElementById("medium").addEventListener("click", () => setDifficulty("medium"));
document.getElementById("hard").addEventListener("click", () => setDifficulty("hard"));

function setDifficulty(level) {
    difficulty = level;
    document.querySelectorAll(".difficulty button").forEach(btn => btn.classList.remove("active"));
    document.getElementById(level).classList.add("active");
    startGame();
}

function randomColor() {
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    return `rgb(${r}, ${g}, ${b})`;
}

function startGame() {
    clearInterval(countdown);
    feedback.textContent = "";
    timerEl.textContent = "";

    const mainColor = randomColor();
    colorDisplay.style.backgroundColor = mainColor;

    let options = [];

    if(difficulty === "easy") {
        options = [mainColor, randomColor(), randomColor()];
    } else if(difficulty === "medium") {
        options = [mainColor, randomColor(), randomColor(), randomColor(), randomColor(), randomColor()];
    } else {
        // Hard mode: user needs to input exact RGB
        const userInput = prompt("Enter RGB value like 'rgb(123, 45, 67)':");
        if(userInput === mainColor){
            alert("Correct! 🎉");
        } else {
            alert(`Wrong! The correct color was ${mainColor}`);
        }
        return startGame();
    }

    // Shuffle options
    options = options.sort(() => Math.random() - 0.5);

    optionsContainer.innerHTML = "";
    options.forEach(color => {
        const btn = document.createElement("button");
        btn.textContent = color;
        btn.addEventListener("click", () => checkAnswer(color, mainColor));
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    if(selected === correct){
        feedback.textContent = "Correct! ✅ Next color in 5 seconds...";
        let time = 5;
        timerEl.textContent = `Next color in ${time}s`;
        countdown = setInterval(() => {
            time--;
            timerEl.textContent = `Next color in ${time}s`;
            if(time === 0){
                clearInterval(countdown);
                startGame();
            }
        }, 1000);
    } else {
        feedback.textContent = "Wrong! ❌ Try again.";
    }
}

// Start game initially
startGame();
