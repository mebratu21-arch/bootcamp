// app.js
import { TodoList } from "./todo.js";

const myTodo = new TodoList();
myTodo.addTask("Learn Node.js");
myTodo.addTask("Build a project");
myTodo.completeTask("Learn Node.js");

console.log("Tasks:", myTodo.listTasks());
