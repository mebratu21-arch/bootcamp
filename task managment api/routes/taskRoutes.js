const express = require('express');
const router = express.Router();
const { readTasks, writeTasks } = require('../utils/fileHandler');
const { validateTaskCreation, validateTaskUpdate } = require('../utils/validation');

/**
 * GET /tasks
 * Retrieve all tasks
 */
router.get('/', async (req, res) => {
  try {
    const tasks = await readTasks();
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve tasks',
      message: error.message
    });
  }
});

/**
 * GET /tasks/:id
 * Retrieve a specific task by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find(t => t.id === req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found',
        message: `No task found with id: ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve task',
      message: error.message
    });
  }
});

/**
 * POST /tasks
 * Create a new task
 */
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const validation = validateTaskCreation(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: validation.errors
      });
    }

    const tasks = await readTasks();

    // Create new task with auto-generated ID and timestamp
    const newTask = {
      id: generateId(tasks),
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      status: req.body.status || 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    tasks.push(newTask);
    await writeTasks(tasks);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create task',
      message: error.message
    });
  }
});

/**
 * PUT /tasks/:id
 * Update an existing task
 */
router.put('/:id', async (req, res) => {
  try {
    // Validate request body
    const validation = validateTaskUpdate(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: validation.errors
      });
    }

    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Task not found',
        message: `No task found with id: ${req.params.id}`
      });
    }

    // Update task fields
    const updatedTask = {
      ...tasks[taskIndex],
      ...(req.body.title && { title: req.body.title.trim() }),
      ...(req.body.description && { description: req.body.description.trim() }),
      ...(req.body.status && { status: req.body.status }),
      updatedAt: new Date().toISOString()
    };

    tasks[taskIndex] = updatedTask;
    await writeTasks(tasks);

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update task',
      message: error.message
    });
  }
});

/**
 * DELETE /tasks/:id
 * Delete a task
 */
router.delete('/:id', async (req, res) => {
  try {
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Task not found',
        message: `No task found with id: ${req.params.id}`
      });
    }

    const deletedTask = tasks[taskIndex];
    tasks.splice(taskIndex, 1);
    await writeTasks(tasks);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: deletedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete task',
      message: error.message
    });
  }
});

/**
 * Helper function to generate unique task IDs
 * @param {Array} tasks - Existing tasks array
 * @returns {string} Generated ID
 */
function generateId(tasks) {
  if (tasks.length === 0) {
    return 'task_1';
  }
  
  // Extract numeric part from last task ID and increment
  const lastId = tasks[tasks.length - 1].id;
  const numericPart = parseInt(lastId.split('_')[1]) || tasks.length;
  return `task_${numericPart + 1}`;
}

module.exports = router;
