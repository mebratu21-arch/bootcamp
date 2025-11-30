// ---------- VARIABLES ----------
const grid = document.getElementById("grid");      // Grid container
const colorPicker = document.getElementById("colorPicker"); // Selected color
let isDrawing = false; // Flag to check if mouse is pressed

// ---------- CREATE 20x20 GRID ----------
for (let i = 0; i < 400; i++) { // 20 * 20 = 400 squares
  const square = document.createElement("div"); // create a div
  square.classList.add("square"); // add square style
  grid.appendChild(square); // put square inside grid

  // Mouse down = start drawing
  square.addEventListener("mousedown", () => {
    isDrawing = true;
    square.style.backgroundColor = colorPicker.value; // paint square
  });

  // Mouse over + drawing = continue painting
  square.addEventListener("mouseover", () => {
    if (isDrawing) {
      square.style.backgroundColor = colorPicker.value;
    }
  });
}

// Mouse up ANYWHERE = stop drawing
document.addEventListener("mouseup", () => {
  isDrawing = false;
});
