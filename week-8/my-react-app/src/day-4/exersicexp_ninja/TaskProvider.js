// TaskProvider.js
import { useReducer } from "react";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";

export default function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
