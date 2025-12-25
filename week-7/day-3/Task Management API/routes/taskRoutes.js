const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = path.join(__dirname, '../tasks.json');

const readTasks = () => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeTasks = (tasks) => fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

router.get('/tasks', (req, res) => {
  try {
    const tasks = readTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read tasks' });
  }
});

router.get('/tasks/:id', (req, res) => {
  try {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read tasks' });
  }
});

router.post('/tasks', (req, res) => {
  try {
    const { title, description, completed } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const tasks = readTasks();
    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      title,
      description: description || '',
      completed: completed || false
    };

    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

router.put('/tasks/:id', (req, res) => {
  try {
    const tasks = readTasks();
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Task not found' });

    const { title, description, completed } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    tasks[index] = {
      ...tasks[index],
      title,
      description: description || tasks[index].description,
      completed: completed !== undefined ? completed : tasks[index].completed
    };

    writeTasks(tasks);
    res.json(tasks[index]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

router.delete('/tasks/:id', (req, res) => {
  try {
    const tasks = readTasks();
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Task not found' });

    const deletedTask = tasks.splice(index, 1)[0];
    writeTasks(tasks);
    res.json({ message: 'Task deleted', task: deletedTask });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
