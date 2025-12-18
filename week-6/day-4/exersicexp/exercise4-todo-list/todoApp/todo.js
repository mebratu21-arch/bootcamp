// todo.js
export class TodoList {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push({ task, completed: false });
  }

  completeTask(task) {
    const found = this.tasks.find(t => t.task === task);
    if (found) found.completed = true;
  }

  listTasks() {
    return this.tasks;
  }
}
