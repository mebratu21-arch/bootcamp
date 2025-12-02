// Tasks array from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

// DOM Elements
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");

// -----------------
// Helper Functions
// -----------------
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  todoList.innerHTML = "";
  let filtered = tasks;
  if (filter === "active") filtered = tasks.filter(t => !t.completed);
  if (filter === "completed") filtered = tasks.filter(t => t.completed);

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.dataset.id = task.id;

    li.innerHTML = `
      <span class="task-text">${task.text}</span>
      <div class="task-buttons">
        <button class="btn-edit">✏️</button>
        <button class="btn-delete">❌</button>
      </div>
    `;

    // Toggle complete when clicking task text
    li.querySelector(".task-text").addEventListener("click", () => toggleComplete(task.id));

    // Inline edit
    li.querySelector(".btn-edit").addEventListener("click", (e) => {
      e.stopPropagation();
      const span = li.querySelector(".task-text");
      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;
      li.replaceChild(input, span);
      input.focus();

      input.addEventListener("blur", () => {
        if (input.value.trim() !== "") {
          task.text = input.value.trim();
          saveTasks();
          renderTasks();
        } else {
          renderTasks();
        }
      });

      // Save on Enter key
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          input.blur();
        }
      });
    });

    // Delete task
    li.querySelector(".btn-delete").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    todoList.appendChild(li);
  });
}

function addTask(text) {
  tasks.push({ id: Date.now(), text, completed: false });
  saveTasks();
  renderTasks();
}

function toggleComplete(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  saveTasks();
  renderTasks();
}

// -----------------
// Event Handlers
// -----------------

// Form submit
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) {
    alert("Task cannot be empty ❌");
    return;
  }
  addTask(text);
  todoInput.value = "";
});

// Enter key on input
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    todoForm.dispatchEvent(new Event("submit"));
  }
});

// Filter buttons
allBtn.addEventListener("click", () => { filter = "all"; renderTasks(); });
activeBtn.addEventListener("click", () => { filter = "active"; renderTasks(); });
completedBtn.addEventListener("click", () => { filter = "completed"; renderTasks(); });

// Hover logging (optional)
todoList.addEventListener("mouseenter", () => console.log("Mouse over task list!"), true);
todoList.addEventListener("mouseleave", () => console.log("Mouse left task list!"), true);

// Initial render
renderTasks();
