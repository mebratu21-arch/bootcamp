// Array to store task objects
const tasks = [];
let taskIdCounter = 0; // to assign unique task IDs

// Select DOM elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const listTasksDiv = document.querySelector('.listTasks');

// Function to add a new task
function addTask(e) {
    e.preventDefault(); // prevent form submission

    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Task cannot be empty!');
        return;
    }

    // Create task object
    const task = {
        task_id: taskIdCounter,
        text: taskText,
        done: false
    };
    tasks.push(task);
    taskIdCounter++;

    // Add task to DOM
    renderTask(task);

    // Clear input
    taskInput.value = '';
}

// Function to render a task in the DOM
function renderTask(task) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.setAttribute('data-task-id', task.task_id);

    taskDiv.innerHTML = `
        <input type="checkbox" onchange="doneTask(${task.task_id}, this)">
        <label>${task.text}</label>
        <button class="delete-btn" onclick="deleteTask(${task.task_id})">
            <i class="fa fa-times"></i>
        </button>
    `;

    listTasksDiv.appendChild(taskDiv);
}

// Function to mark a task as done
function doneTask(id, checkbox) {
    const task = tasks.find(t => t.task_id === id);
    if (!task) return;

    task.done = checkbox.checked;

    const taskDiv = document.querySelector(`.task[data-task-id='${id}']`);
    if (task.done) {
        taskDiv.classList.add('done');
    } else {
        taskDiv.classList.remove('done');
    }
}

// Function to delete a task
function deleteTask(id) {
    const index = tasks.findIndex(t => t.task_id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
    }

    const taskDiv = document.querySelector(`.task[data-task-id='${id}']`);
    if (taskDiv) {
        taskDiv.remove();
    }
}

// Event listener for form submission
taskForm.addEventListener('submit', addTask);
