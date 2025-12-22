const { readFile, writeFile } = require("../utils/fileHandler");
const { v4: uuidv4 } = require("uuid");

exports.getAll = () => readFile();

exports.getById = (id) => {
  const tasks = readFile();
  return tasks.find((t) => t.id === id);
};

exports.create = (title, description) => {
  const tasks = readFile();
  const newTask = {
    id: uuidv4(),
    title,
    description,
    completed: false
  };
  tasks.push(newTask);
  writeFile(tasks);
  return newTask;
};

exports.update = (id, updatedData) => {
  const tasks = readFile();
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) return null;

  tasks[index] = { ...tasks[index], ...updatedData };
  writeFile(tasks);
  return tasks[index];
};

exports.remove = (id) => {
  const tasks = readFile();
  const filtered = tasks.filter((t) => t.id !== id);
  writeFile(filtered);
};
