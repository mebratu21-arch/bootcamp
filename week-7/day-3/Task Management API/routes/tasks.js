const express = require('express');
const router = express.Router();
const { readTasks, writeTasks } = require('../utils/fileHandler');

// Helper: Find task by ID
const findTaskIndex = (tasks, id) => tasks.findIndex(task => task.id === parseInt(id));

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET task by ID
router.get('/:id', async (req, res) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new task
router.post('/', async (req, res) => {
  try {
    const { title, description, completed = false } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
    }

    const tasks = await readTasks();
    
    const newTask = {
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      title: title.trim(),
      description: description?.trim() || '',
      completed: Boolean(completed),
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    await writeTasks(tasks);

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update task by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    // At least one field should be provided for update
    if (!title && !description && completed === undefined) {
      return res.status(400).json({ error: 'At least one field (title, description, or completed) is required' });
    }

    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
      return res.status(400).json({ error: 'Title must be a non-empty string' });
    }

    const tasks = await readTasks();
    const index = findTaskIndex(tasks, id);

    if (index === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    tasks[index] = {
      ...tasks[index],
      title: title?.trim() ?? tasks[index].title,
      description: description?.trim() ?? tasks[index].description,
      completed: completed !== undefined ? Boolean(completed) : tasks[index].completed,
      updatedAt: new Date().toISOString()
    };

    await writeTasks(tasks);
    res.json(tasks[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE task by ID
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const tasks = await readTasks();
    const index = findTaskIndex(tasks, id);

    if (index === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const deletedTask = tasks.splice(index, 1)[0];
    await writeTasks(tasks);

    res.json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;