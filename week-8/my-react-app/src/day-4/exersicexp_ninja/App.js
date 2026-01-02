// App.js
import TaskProvider from "./TaskProvider";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

function App() {
  return (
    <TaskProvider>
      <h1>Task Manager</h1>
      <AddTask />
      <TaskList />
    </TaskProvider>
  );
}

export default App;
