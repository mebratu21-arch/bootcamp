"use strict";

// ==============================
// SELECT MAIN ELEMENTS
// ==============================
var input = document.getElementById("todo-input");
var addBtn = document.getElementById("add-btn");
var todoList = document.getElementById("todo-list");
var filterButtons = document.querySelectorAll(".filter"); // Load tasks from localStorage when page loads

loadTasks(); // ==============================
// ADD NEW TASK
// ==============================

addBtn.addEventListener("click", function () {
  var text = input.value.trim(); // clean spaces

  if (text === "") {
    alert("Please enter a task!");
    return;
  }

  addTask(text, false); // create a new active task

  saveTasks(); // save to localStorage

  input.value = ""; // clear input
}); // ==============================
// FUNCTION TO CREATE A TASK
// ==============================

function addTask(text, completed) {
  var li = document.createElement("li"); // If task was completed before refresh

  if (completed) {
    li.classList.add("completed");
  } // ---------- Task Text ----------


  var span = document.createElement("span");
  span.textContent = text; // ---------- Action Buttons ----------

  var actions = document.createElement("div");
  actions.classList.add("actions"); // Complete button

  var completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";

  completeBtn.onclick = function () {
    li.classList.toggle("completed"); // mark complete/active

    saveTasks();
  }; // Edit button (inline edit)


  var editBtn = document.createElement("button");
  editBtn.textContent = "✏";

  editBtn.onclick = function () {
    return editTask(li, span, editBtn);
  }; // Delete button


  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";

  deleteBtn.onclick = function () {
    li.remove();
    saveTasks();
  }; // Add buttons to actions div


  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn); // Add text + actions to <li>

  li.appendChild(span);
  li.appendChild(actions); // Add <li> to the list

  todoList.appendChild(li);
} // ==============================
// INLINE EDIT FUNCTION
// ==============================


function editTask(li, span, editBtn) {
  // Create input and fill with old text
  var inputEdit = document.createElement("input");
  inputEdit.type = "text";
  inputEdit.value = span.textContent; // Replace span with input

  li.replaceChild(inputEdit, span);
  inputEdit.focus(); // Change edit button to "save"

  editBtn.textContent = "💾"; // Save function

  var saveEdit = function saveEdit() {
    var newText = inputEdit.value.trim();

    if (newText === "") {
      alert("Task cannot be empty");
      return;
    } // Replace input with new span text


    var newSpan = document.createElement("span");
    newSpan.textContent = newText;
    li.replaceChild(newSpan, inputEdit); // Restore edit button

    editBtn.textContent = "✏";

    editBtn.onclick = function () {
      return editTask(li, newSpan, editBtn);
    }; // Save to local storage


    saveTasks();
  }; // Save on click


  editBtn.onclick = saveEdit; // Save on Enter key

  inputEdit.addEventListener("keydown", function (e) {
    if (e.key === "Enter") saveEdit();

    if (e.key === "Escape") {
      // If Esc → cancel edit
      li.replaceChild(span, inputEdit);
      editBtn.textContent = "✏";
    }
  });
} // ==============================
// SAVE ALL TASKS TO LOCAL STORAGE
// ==============================


function saveTasks() {
  var tasks = [];
  document.querySelectorAll("#todo-list li").forEach(function (li) {
    var text = li.querySelector("span").textContent;
    var done = li.classList.contains("completed");
    tasks.push({
      text: text,
      completed: done
    });
  });
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
} // ==============================
// LOAD TASKS FROM LOCAL STORAGE
// ==============================


function loadTasks() {
  var saved = localStorage.getItem("todoTasks");
  if (!saved) return;
  var tasks = JSON.parse(saved);
  tasks.forEach(function (task) {
    return addTask(task.text, task.completed);
  });
} // ==============================
// FILTER SYSTEM (All / Active / Completed)
// ==============================


filterButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    // remove highlight from all buttons
    filterButtons.forEach(function (b) {
      return b.classList.remove("active-filter");
    }); // highlight clicked button

    btn.classList.add("active-filter"); // show correct tasks

    filterTasks(btn.dataset.filter);
  });
}); // Show tasks based on filter

function filterTasks(filter) {
  var tasks = document.querySelectorAll("#todo-list li");
  tasks.forEach(function (li) {
    if (filter === "all") {
      li.style.display = "flex";
    } else if (filter === "active") {
      li.style.display = li.classList.contains("completed") ? "none" : "flex";
    } else if (filter === "completed") {
      li.style.display = li.classList.contains("completed") ? "flex" : "none";
    }
  });
}