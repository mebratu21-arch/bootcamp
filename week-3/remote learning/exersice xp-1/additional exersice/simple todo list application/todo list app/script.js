const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const removeAllBtn = document.getElementById('removeAllBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');

let tasks = [];

// Function to render tasks
function renderTasks(filter = 'all') {
  taskList.innerHTML = '';

  let filteredTasks = tasks;
  if(filter === 'active') filteredTasks = tasks.filter(task => !task.completed);
  if(filter === 'completed') filteredTasks = tasks.filter(task => task.completed);

  filteredTasks.forEach((task, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    if(task.completed) taskDiv.classList.add('completed');

    taskDiv.innerHTML = `
      <label>
        <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
        <span>${task.text}</span>
      </label>
      <button class="btn red remove-btn" data-index="${index}">REMOVE</button>
    `;
    taskList.appendChild(taskDiv);
  });

  removeAllBtn.disabled = tasks.length === 0;
}

// Add new task
addBtn.addEventListener('click', () => {
  const text = todoInput.value.trim();
  if(text) {
    tasks.push({ text, completed: false });
    todoInput.value = '';
    renderTasks();
  }
});

// Remove all tasks
removeAllBtn.addEventListener('click', () => {
  tasks = [];
  renderTasks();
});

// Task complete toggle
taskList.addEventListener('change', (e) => {
  if(e.target.type === 'checkbox') {
    const index = e.target.dataset.index;
    tasks[index].completed = e.target.checked;
    renderTasks();
  }
});

// Remove individual task
taskList.addEventListener('click', (e) => {
  if(e.target.classList.contains('remove-btn')) {
    const index = e.target.dataset.index;
    tasks.splice(index, 1);
    renderTasks();
  }
});

// Filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('blue'));
    btn.classList.add('blue');
    renderTasks(btn.dataset.filter);
  });
});

// Initial render
renderTasks();
