let tasks = [];
let currentFilter = 'all';

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    
    if (text === '') return;
    
    tasks.push({
        id: Date.now(),
        text: text,
        done: false
    });
    
    input.value = '';
    showTasks();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    task.done = !task.done;
    showTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    showTasks();
}

function filterTasks(filter) {
    currentFilter = filter;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    showTasks();
}

function showTasks() {
    const list = document.getElementById('todoList');
    
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(t => !t.done);
    } else if (currentFilter === 'complete') {
        filteredTasks = tasks.filter(t => t.done);
    }
    
    if (filteredTasks.length === 0) {
        list.innerHTML = '<div class="empty">No tasks to show!</div>';
        return;
    }
    
    list.innerHTML = filteredTasks.map(task => `
        <li class="todo-item ${task.done ? 'done' : ''}">
            <input type="checkbox" ${task.done ? 'checked' : ''} 
                   onchange="toggleTask(${task.id})">
            <span>${task.text}</span>
            <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
        </li>
    `).join('');
}

document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
});

showTasks();