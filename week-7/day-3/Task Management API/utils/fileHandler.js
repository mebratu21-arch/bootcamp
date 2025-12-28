const fs = require('fs').promises;
const path = require('path');

const TASKS_FILE = path.join(__dirname, '../data/tasks.json');

async function readTasks() {
  try {
    const data = await fs.readFile(TASKS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, create it with empty array
      await fs.mkdir(path.dirname(TASKS_FILE), { recursive: true });
      await fs.writeFile(TASKS_FILE, '[]');
      return [];
    }
    throw new Error('Failed to read tasks');
  }
}

async function writeTasks(tasks) {
  try {
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
  } catch (error) {
    throw new Error('Failed to write tasks');
  }
}

module.exports = { readTasks, writeTasks };