// TaskProvider.js
import { useReducer } from "react";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";

const initialState = {
  tasks: [],
  filter: "all" // all | completed | active
};

export default function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
