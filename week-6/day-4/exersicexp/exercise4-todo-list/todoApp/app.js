import { TodoList } from './todo.js';

// Create an instance of TodoList
const myTodoList = new TodoList();

// Add tasks
console.log('=== Adding Tasks ===');
myTodoList.addTask('Buy groceries');
myTodoList.addTask('Complete Node.js exercises');
myTodoList.addTask('Call mom');
myTodoList.addTask('Exercise for 30 minutes');

// List all tasks
myTodoList.listTasks();

// Mark some tasks as complete
console.log('\n=== Completing Tasks ===');
myTodoList.completeTask(2); // Complete Node.js exercises
myTodoList.completeTask(4); // Exercise for 30 minutes

// List tasks again to see updates
myTodoList.listTasks();

// Show statistics
const stats = myTodoList.getStats();
console.log('\n=== Statistics ===');
console.log(`Total tasks: ${stats.total}`);
console.log(`Completed: ${stats.completed}`);
console.log(`Pending: ${stats.pending}`);