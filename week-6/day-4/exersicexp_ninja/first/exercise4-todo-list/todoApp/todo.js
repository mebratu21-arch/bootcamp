export class TodoList {
  constructor() {
    this.tasks = [];
    this.taskId = 1;
  }

  addTask(description) {
    const task = {
      id: this.taskId++,
      description,
      completed: false,
      createdAt: new Date()
    };
    this.tasks.push(task);
    return task;
  }

  completeTask(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = true;
      task.completedAt = new Date();
    }
    return task;
  }

  listTasks() {
    console.log('Todo List:');
    this.tasks.forEach(task => {
      const status = task.completed ? '✓' : '○';
      console.log(`${status} ${task.id}: ${task.description}`);
    });
  }
}