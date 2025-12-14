// ==============================
// SELECT MAIN ELEMENTS
// ==============================
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const filterButtons = document.querySelectorAll(".filter");

// Load tasks from localStorage when page loads
loadTasks();


// ==============================
// ADD NEW TASK
// ==============================
addBtn.addEventListener("click", () => {
    const text = input.value.trim(); // clean spaces

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    addTask(text, false); // create a new active task
    saveTasks();          // save to localStorage
    input.value = "";     // clear input
});


// ==============================
// FUNCTION TO CREATE A TASK
// ==============================
function addTask(text, completed) {
    const li = document.createElement("li");

    // If task was completed before refresh
    if (completed) {
        li.classList.add("completed");
    }

    // ---------- Task Text ----------
    const span = document.createElement("span");
    span.textContent = text;

    // ---------- Action Buttons ----------
    const actions = document.createElement("div");
    actions.classList.add("actions");

    // Complete button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.onclick = () => {
        li.classList.toggle("completed"); // mark complete/active
        saveTasks();
    };

    // Edit button (inline edit)
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏";
    editBtn.onclick = () => editTask(li, span, editBtn);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.onclick = () => {
        li.remove();
        saveTasks();
    };

    // Add buttons to actions div
    actions.appendChild(completeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    // Add text + actions to <li>
    li.appendChild(span);
    li.appendChild(actions);

    // Add <li> to the list
    todoList.appendChild(li);
}


// ==============================
// INLINE EDIT FUNCTION
 // ==============================
function editTask(li, span, editBtn) {
    // Create input and fill with old text
    const inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = span.textContent;

    // Replace span with input
    li.replaceChild(inputEdit, span);
    inputEdit.focus();

    // Change edit button to "save"
    editBtn.textContent = "💾";

    // Save function
    const saveEdit = () => {
        const newText = inputEdit.value.trim();

        if (newText === "") {
            alert("Task cannot be empty");
            return;
        }

        // Replace input with new span text
        const newSpan = document.createElement("span");
        newSpan.textContent = newText;

        li.replaceChild(newSpan, inputEdit);

        // Restore edit button
        editBtn.textContent = "✏";
        editBtn.onclick = () => editTask(li, newSpan, editBtn);

        // Save to local storage
        saveTasks();
    };

    // Save on click
    editBtn.onclick = saveEdit;

    // Save on Enter key
    inputEdit.addEventListener("keydown", (e) => {
        if (e.key === "Enter") saveEdit();
        if (e.key === "Escape") {
            // If Esc → cancel edit
            li.replaceChild(span, inputEdit);
            editBtn.textContent = "✏";
        }
    });
}


// ==============================
// SAVE ALL TASKS TO LOCAL STORAGE
// ==============================
function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#todo-list li").forEach(li => {
        const text = li.querySelector("span").textContent;
        const done = li.classList.contains("completed");

        tasks.push({ text: text, completed: done });
    });

    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}


// ==============================
// LOAD TASKS FROM LOCAL STORAGE
// ==============================
function loadTasks() {
    const saved = localStorage.getItem("todoTasks");
    if (!saved) return;

    const tasks = JSON.parse(saved);

    tasks.forEach(task => addTask(task.text, task.completed));
}


// ==============================
// FILTER SYSTEM (All / Active / Completed)
// ==============================
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        // remove highlight from all buttons
        filterButtons.forEach(b => b.classList.remove("active-filter"));

        // highlight clicked button
        btn.classList.add("active-filter");

        // show correct tasks
        filterTasks(btn.dataset.filter);
    });
});

// Show tasks based on filter
function filterTasks(filter) {
    const tasks = document.querySelectorAll("#todo-list li");

    tasks.forEach(li => {
        if (filter === "all") {
            li.style.display = "flex";
        } 
        else if (filter === "active") {
            li.style.display = li.classList.contains("completed") ? "none" : "flex";
        } 
        else if (filter === "completed") {
            li.style.display = li.classList.contains("completed") ? "flex" : "none";
        }
    });
}
