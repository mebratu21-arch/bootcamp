const fs = require('fs').promises;
const path = require('path');

const TASKS_FILE = path.join(__dirname, '..', 'tasks.json');

/**
 * Read all tasks from the JSON file
 * @returns {Promise<Array>} Array of task objects
 */
async function readTasks() {
  try {
    const data = await fs.readFile(TASKS_FILE, 'utf8');
    // Handle empty file case
    if (!data.trim()) {
      return [];
    }
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    if (error.code === 'ENOENT') {
      return [];
    }
    // Re-throw other errors
    throw new Error(`Error reading tasks file: ${error.message}`);
  }
}

/**
 * Write tasks to the JSON file
 * @param {Array} tasks - Array of task objects to write
 * @returns {Promise<void>}
 */
async function writeTasks(tasks) {
  try {
    const data = JSON.stringify(tasks, null, 2);
    await fs.writeFile(TASKS_FILE, data, 'utf8');
  } catch (error) {
    throw new Error(`Error writing tasks file: ${error.message}`);
  }
}

module.exports = {
  readTasks,
  writeTasks
};
