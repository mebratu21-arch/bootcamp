const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const TASKS_FILE = path.join(__dirname, '../tasks.json');

async function readTasks() {
    try {
        const data = await fs.readFile(TASKS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
}

async function writeTasks(tasks) {
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// GET /tasks: Retrieve a list of all tasks
router.get('/', async (req, res, next) => {
    try {
        const tasks = await readTasks();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
});

// GET /tasks/:id: Retrieve a specific task by ID
router.get('/:id', async (req, res, next) => {
    try {
        const tasks = await readTasks();
        const task = tasks.find(t => t.id === req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        next(error);
    }
});

// POST /tasks: Create a new task
router.post('/', async (req, res, next) => {
    try {
        const { title, description, priority, dueDate } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const tasks = await readTasks();
        const newTask = {
            id: uuidv4(),
            title,
            description: description || '',
            priority: priority || 'medium',
            dueDate: dueDate || null,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        tasks.push(newTask);
        await writeTasks(tasks);
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
});

// PUT /tasks/:id: Update a task by ID
router.put('/:id', async (req, res, next) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;
        const tasks = await readTasks();
        const index = tasks.findIndex(t => t.id === req.params.id);

        if (index === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const updatedTask = {
            ...tasks[index],
            title: title || tasks[index].title,
            description: description !== undefined ? description : tasks[index].description,
            status: status || tasks[index].status,
            priority: priority || tasks[index].priority,
            dueDate: dueDate !== undefined ? dueDate : tasks[index].dueDate,
            updatedAt: new Date().toISOString()
        };

        tasks[index] = updatedTask;
        await writeTasks(tasks);
        res.json(updatedTask);
    } catch (error) {
        next(error);
    }
});

// DELETE /tasks/:id: Delete a task by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const tasks = await readTasks();
        const filteredTasks = tasks.filter(t => t.id !== req.params.id);

        if (tasks.length === filteredTasks.length) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await writeTasks(filteredTasks);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
