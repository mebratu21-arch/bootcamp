  document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const todoInput = document.getElementById('todo-input');
            const addBtn = document.getElementById('add-btn');
            const todoList = document.getElementById('todo-list');
            const filterBtns = document.querySelectorAll('.filter-btn');
            const totalTasksEl = document.getElementById('total-tasks');
            const completedTasksEl = document.getElementById('completed-tasks');
            
            // State
            let todos = JSON.parse(localStorage.getItem('todos')) || [];
            let currentFilter = 'all';
            
            // Initialize
            renderTodos();
            updateStats();
            
            // Event Listeners
            addBtn.addEventListener('click', addTodo);
            todoInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') addTodo();
            });
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Update active filter button
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Set current filter and re-render
                    currentFilter = this.getAttribute('data-filter');
                    renderTodos();
                });
            });
            
            // Functions
            function addTodo() {
                const text = todoInput.value.trim();
                if (text === '') return;
                
                const newTodo = {
                    id: Date.now(),
                    text: text,
                    completed: false
                };
                
                todos.push(newTodo);
                saveTodos();
                renderTodos();
                updateStats();
                
                // Clear input
                todoInput.value = '';
                todoInput.focus();
            }
            
            function toggleTodo(id) {
                todos = todos.map(todo => {
                    if (todo.id === id) {
                        return { ...todo, completed: !todo.completed };
                    }
                    return todo;
                });
                
                saveTodos();
                renderTodos();
                updateStats();
            }
            
            function deleteTodo(id) {
                todos = todos.filter(todo => todo.id !== id);
                saveTodos();
                renderTodos();
                updateStats();
            }
            
            function renderTodos() {
                // Filter todos based on current filter
                let filteredTodos = [];
                
                if (currentFilter === 'active') {
                    filteredTodos = todos.filter(todo => !todo.completed);
                } else if (currentFilter === 'completed') {
                    filteredTodos = todos.filter(todo => todo.completed);
                } else {
                    filteredTodos = todos;
                }
                
                // Clear the list
                todoList.innerHTML = '';
                
                // Show empty state if no todos
                if (filteredTodos.length === 0) {
                    const emptyState = document.createElement('div');
                    emptyState.className = 'empty-state';
                    
                    let message = '';
                    if (currentFilter === 'all') {
                        message = 'No tasks yet. Add a task to get started!';
                    } else if (currentFilter === 'active') {
                        message = 'No active tasks. Great job!';
                    } else {
                        message = 'No completed tasks yet.';
                    }
                    
                    emptyState.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        <p>${message}</p>
                    `;
                    
                    todoList.appendChild(emptyState);
                    return;
                }
                
                // Render todos
                filteredTodos.forEach(todo => {
                    const todoItem = document.createElement('li');
                    todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
                    
                    todoItem.innerHTML = `
                        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                        <span class="todo-text">${todo.text}</span>
                        <button class="delete-btn">×</button>
                    `;
                    
                    // Add event listeners to the new elements
                    const checkbox = todoItem.querySelector('.todo-checkbox');
                    const deleteBtn = todoItem.querySelector('.delete-btn');
                    
                    checkbox.addEventListener('change', () => toggleTodo(todo.id));
                    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
                    
                    todoList.appendChild(todoItem);
                });
            }
            
            function updateStats() {
                const total = todos.length;
                const completed = todos.filter(todo => todo.completed).length;
                
                totalTasksEl.textContent = `Total: ${total} ${total === 1 ? 'task' : 'tasks'}`;
                completedTasksEl.textContent = `Completed: ${completed} ${completed === 1 ? 'task' : 'tasks'}`;
            }
            
            function saveTodos() {
                localStorage.setItem('todos', JSON.stringify(todos));
            }
        });