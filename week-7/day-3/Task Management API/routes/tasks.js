const express = require('express');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const TASKS_FILE = './tasks.json';

// Helper function to read tasks
async function readTasks() {
  try {
    const data = await fs.readFile(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    throw new Error('Could not read tasks file');
  }
}

// Helper function to write tasks
async function writeTasks(tasks) {
  try {
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
  } catch (err) {
    throw new Error('Could not write to tasks file');
  }
}

// GET /tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// GET /tasks/:id
router.get('/:id', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// POST /tasks
router.post('/', async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    const tasks = await readTasks();
    const newTask = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    await writeTasks(tasks);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
});

// PUT /tasks/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });

    if (title !== undefined) tasks[taskIndex].title = title;
    if (description !== undefined) tasks[taskIndex].description = description;
    if (completed !== undefined) tasks[taskIndex].completed = completed;

    await writeTasks(tasks);
    res.json(tasks[taskIndex]);
  } catch (err) {
    next(err);
  }
});

// DELETE /tasks/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const filteredTasks = tasks.filter(t => t.id !== req.params.id);
    if (filteredTasks.length === tasks.length) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await writeTasks(filteredTasks);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
