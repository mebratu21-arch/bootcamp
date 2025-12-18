export class TodoList {
  constructor() {
    this.tasks = [];
    this.taskId = 1;
  }

  // Add a new task
  addTask(description) {
    const task = {
      id: this.taskId++,
      description,
      completed: false,
      createdAt: new Date()
    };
    this.tasks.push(task);
    console.log(`Task added: ${description}`);
    return task;
  }

  // Mark task as complete
  completeTask(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = true;
      task.completedAt = new Date();
      console.log(`Task ${taskId} marked as complete`);
      return task;
    } else {
      console.log(`Task ${taskId} not found`);
      return null;
    }
  }

  // List all tasks
  listTasks() {
    console.log('\n=== Todo List ===');
    if (this.tasks.length === 0) {
      console.log('No tasks found.');
      return;
    }
    
    this.tasks.forEach(task => {
      const status = task.completed ? '✓' : '○';
      const date = task.createdAt.toLocaleDateString();
      console.log(`${status} ${task.id}: ${task.description} (Created: ${date})`);
      if (task.completed) {
        console.log(`   Completed: ${task.completedAt.toLocaleDateString()}`);
      }
    });
  }

  // Get task statistics
  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;
    
    return {
      total,
      completed,
      pending
    };
  }
}