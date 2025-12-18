import { TodoList } from './todo.js';

const todoList = new TodoList();
todoList.addTask('Buy groceries');
todoList.addTask('Do laundry');
todoList.addTask('Study Node.js');

todoList.completeTask(2);

todoList.listTasks();