// =========================
// Exercise 1: Timer
// =========================

// Part I: Alert "Hello World" after 2 seconds
setTimeout(function() {
    alert("Hello World");
}, 2000);

// Part II: Add a paragraph <p>Hello World</p> after 2 seconds
setTimeout(function() {
    const container = document.getElementById("container");
    const p = document.createElement("p");
    p.textContent = "Hello World";
    container.appendChild(p);
}, 2000);

// Part III: Add a new paragraph every 2 seconds and stop after 5 paragraphs
const container = document.getElementById("container");
let count = 0;

const intervalId = setInterval(function() {
    const p = document.createElement("p");
    p.textContent = "Hello World";
    container.appendChild(p);
    count++;

    // Stop interval after 5 paragraphs
    if (count >= 5) {
        clearInterval(intervalId);
    }
}, 2000);

// Optional: Stop interval on button click
document.getElementById("clear").addEventListener("click", function() {
    clearInterval(intervalId);
});

// =========================
// Exercise 2: Move the box
// =========================

function myMove() {
    const box = document.getElementById("animate");
    const container = document.getElementById("container");

    let pos = 0; // Initial position
    const containerWidth = container.clientWidth - box.offsetWidth; // Max right position

    // Move the box every 1 millisecond
    const id = setInterval(frame, 1);

    function frame() {
        if (pos >= containerWidth) {
            clearInterval(id); // Stop when the box reaches the right end
        } else {
            pos++; // Increase position by 1px
            box.style.left = pos + "px"; // Move the box
        }
    }
}
