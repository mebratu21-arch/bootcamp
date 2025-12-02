// Get elements from HTML
const input = document.getElementById("input");            // Text input field
const btn = document.getElementById("btn");                // Add button
const list = document.getElementById("list");              // <ul> where todos appear
const filterButtons = document.querySelectorAll(".filter button");  // All filter buttons
const removeAllBtn = document.getElementById("removeAll"); // Remove All button
const form = document.getElementById("todoForm");          // The todo form

// --------------------------------------------------------------
// Function: Enable or disable the "Remove All" button
// --------------------------------------------------------------
function updateRemoveAllState() {
    // Disable button when list is empty
    removeAllBtn.disabled = list.children.length === 0;
}

// --------------------------------------------------------------
// Event: Add todo when form is submitted (button or enter key)
// --------------------------------------------------------------
form.addEventListener("submit", (e) => {
    e.preventDefault();  // Prevent form from refreshing the page

    const text = input.value.trim();   // Remove extra spaces

    // Prevent adding empty todo
    if (text === "") {
        alert("Please enter a valid task.");
        return;
    }

    // Create a new <li>
    const li = document.createElement("li");

    // Add the todo text and remove button inside <li>
    li.innerHTML = `
        <span>${text}</span>
        <button class="remove">X</button>
    `;

    // ----------------------------------------------------------
    // Event: Toggle task completed (line-through)
    // ----------------------------------------------------------
    li.addEventListener("click", function (e) {
        // If user clicked the remove button, skip toggle
        if (e.target.classList.contains("remove")) return;

        // Add / remove .done class
        li.classList.toggle("done");
    });

    // ----------------------------------------------------------
    // Event: Remove individual todo
    // ----------------------------------------------------------
    li.querySelector(".remove").addEventListener("click", () => {
        li.remove();             // Remove the <li>
        updateRemoveAllState();  // Disable button if list empty
    });

    // Add the new todo to the list
    list.appendChild(li);

    // Clear the input field after adding
    input.value = "";

    // Update "Remove All" button state
    updateRemoveAllState();
});

// --------------------------------------------------------------
// Event: Filter Todos (All, Active, Completed)
// --------------------------------------------------------------
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;   // Get which filter was clicked
        const todos = list.querySelectorAll("li");  // Get all todos

        // Loop through each todo
        todos.forEach(todo => {
            switch (filter) {

                case "all":      // Show all tasks
                    todo.style.display = "flex";
                    break;

                case "active":   // Show tasks NOT completed
                    todo.style.display = todo.classList.contains("done") 
                        ? "none" 
                        : "flex";
                    break;

                case "completed": // Show only completed tasks
                    todo.style.display = todo.classList.contains("done") 
                        ? "flex" 
                        : "none";
                    break;
            }
        });
    });
});

// --------------------------------------------------------------
// Event: Remove all todos at once
// --------------------------------------------------------------
removeAllBtn.addEventListener("click", () => {
    list.innerHTML = "";         // Clear the todo list completely
    updateRemoveAllState();      // Disable button because list is empty
});
