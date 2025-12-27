const fs = require('fs-extra');
const path = './tasks.json';

// Helper: read tasks
async function readTasks() {
  try {
    return await fs.readJSON(path);
  } catch (err) {
    throw new Error('Error reading tasks file');
  }
}

// Helper: write tasks
async function writeTasks(tasks) {
  try {
    await fs.writeJSON(path, tasks, { spaces: 2 });
  } catch (err) {
    throw new Error('Error writing tasks file');
  }
}

// GET /tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /tasks/:id
exports.getTaskById = async (req, res) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find(t => t.id === parseInt(req.params.id));

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /tasks
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const tasks = await readTasks();
    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      title,
      description: description || '',
      completed: false
    };

    tasks.push(newTask);
    await writeTasks(tasks);

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title,
      description: description ?? tasks[taskIndex].description,
      completed: completed ?? tasks[taskIndex].completed
    };

    await writeTasks(tasks);
    res.json(tasks[taskIndex]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const tasks = await readTasks();
    const filtered = tasks.filter(t => t.id !== parseInt(req.params.id));

    if (filtered.length === tasks.length) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await writeTasks(filtered);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
