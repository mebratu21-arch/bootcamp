const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const totalCount = document.getElementById('totalCount');
const notification = document.getElementById('notification');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');

let allTasks = [];
let currentFilter = 'all';
let searchQuery = '';

// Fetch and display tasks
async function fetchTasks() {
    try {
        const response = await fetch('/tasks');
        allTasks = await response.json();
        applyFilterAndSearch();
    } catch (error) {
        showNotification('Error fetching tasks', 'error');
    }
}

// Apply current filter and search
function applyFilterAndSearch() {
    let filtered = allTasks;

    // Filter by status
    if (currentFilter !== 'all') {
        filtered = filtered.filter(t => t.status === currentFilter);
    }

    // Search by title
    if (searchQuery) {
        filtered = filtered.filter(t => 
            t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }

    renderTasks(filtered);
}

// Search interaction
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    applyFilterAndSearch();
});

// Filter interaction
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        applyFilterAndSearch();
    });
});

// Render tasks to the UI
function renderTasks(tasks) {
    taskList.innerHTML = '';
    totalCount.textContent = tasks.length;

    if (tasks.length === 0) {
        taskList.innerHTML = '<div class="glass" style="padding: 2rem; text-align: center; color: var(--text-muted);">No tasks found.</div>';
        return;
    }

    tasks.forEach(task => {
        const card = document.createElement('div');
        card.className = `task-card glass ${task.status === 'completed' ? 'completed' : ''}`;
        
        const priorityLabel = task.priority || 'medium';
        const formattedDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric'}) : '';

        card.innerHTML = `
            <div class="task-info">
                <h3>
                    ${escapeHtml(task.title)}
                    <span class="priority-badge priority-${priorityLabel}">${priorityLabel}</span>
                </h3>
                <p>${escapeHtml(task.description || 'No description')}</p>
                ${formattedDate ? `<div class="due-date">📅 ${formattedDate}</div>` : ''}
            </div>
            <div class="task-actions">
                <button class="btn-icon btn-complete" title="Mark as ${task.status === 'completed' ? 'pending' : 'completed'}">
                    ${task.status === 'completed' ? '✓' : '○'}
                </button>
                <button class="btn-icon btn-delete" title="Delete Task">×</button>
            </div>
        `;

        // Event Listeners for actions
        const completeBtn = card.querySelector('.btn-complete');
        completeBtn.addEventListener('click', () => toggleTaskStatus(task.id, task.status));

        const deleteBtn = card.querySelector('.btn-delete');
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        taskList.appendChild(card);
    });
}

// Add new task
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const priority = document.getElementById('taskPriority').value;
    const dueDate = document.getElementById('taskDueDate').value;

    try {
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, priority, dueDate })
        });

        if (response.ok) {
            taskForm.reset();
            // Reset priority to medium after form reset if needed, though browser might handle it
            document.getElementById('taskPriority').value = 'medium';
            fetchTasks();
            showNotification('Task added successfully!');
        } else {
            const error = await response.json();
            showNotification(error.error || 'Failed to add task', 'error');
        }
    } catch (error) {
        showNotification('Network error', 'error');
    }
});

// Toggle task status
async function toggleTaskStatus(id, currentStatus) {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
        const response = await fetch(`/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });

        if (response.ok) {
            fetchTasks();
            showNotification(`Task marked as ${newStatus}`);
        }
    } catch (error) {
        showNotification('Error updating task', 'error');
    }
}

// Delete task
async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
        const response = await fetch(`/tasks/${id}`, { method: 'DELETE' });
        if (response.ok) {
            fetchTasks();
            showNotification('Task deleted');
        }
    } catch (error) {
        showNotification('Error deleting task', 'error');
    }
}

// Utility: Show notification
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.style.background = type === 'error' ? 'var(--danger)' : 'var(--primary)';
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Utility: Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initial fetch
fetchTasks();
