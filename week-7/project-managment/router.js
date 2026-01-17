const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Helper function to read tasks
async function readTasks() {
    try {
        const data = await fs.readFile(TASKS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await writeTasks([]); // Create file if it doesn't exist
            return [];
        }
        throw error;
    }
}

// Helper function to write tasks
async function writeTasks(tasks) {
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// GET /tasks: Retrieve a list of all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await readTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read tasks' });
    }
});

// GET /tasks/:id: Retrieve a specific task by ID
router.get('/tasks/:id', async (req, res) => {
    try {
        const tasks = await readTasks();
        const task = tasks.find(t => t.id === parseInt(req.params.id));
        
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve task' });
    }
});

// POST /tasks: Create a new task
router.post('/tasks', async (req, res) => {
    try {
        const { title, description } = req.body;
        
        // Validation
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }

        const tasks = await readTasks();
        const newTask = {
            id: Date.now(), // Simple ID generation
            title,
            description,
            completed: false,
            createdAt: new Date().toISOString()
        };

        tasks.push(newTask);
        await writeTasks(tasks);
        
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// PUT /tasks/:id: Update a task by ID
router.put('/tasks/:id', async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const taskId = parseInt(req.params.id);

        const tasks = await readTasks();
        const taskIndex = tasks.findIndex(t => t.id === taskId);

        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Validation for partial updates (if fields are provided, they must be valid)
        // We will update only provided fields
        const updatedTask = {
            ...tasks[taskIndex],
            ...(title && { title }),
            ...(description && { description }),
            ...(completed !== undefined && { completed })
        };

        tasks[taskIndex] = updatedTask;
        await writeTasks(tasks);

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// DELETE /tasks/:id: Delete a task by ID
router.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const tasks = await readTasks();
        const filteredTasks = tasks.filter(t => t.id !== taskId);

        if (tasks.length === filteredTasks.length) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await writeTasks(filteredTasks);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

module.exports = router;