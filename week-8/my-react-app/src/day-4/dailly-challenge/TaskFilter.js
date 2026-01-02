// TaskFilter.js
import { useContext } from "react";
import { TaskContext } from "./TaskContext";

export default function TaskFilter() {
  const { state, dispatch } = useContext(TaskContext);

  return (
    <div style={{ marginTop: "10px" }}>
      <button
        onClick={() => dispatch({ type: "FILTER_TASKS", payload: "all" })}
      >
        All
      </button>

      <button
        onClick={() => dispatch({ type: "FILTER_TASKS", payload: "completed" })}
      >
        Completed
      </button>

      <button
        onClick={() => dispatch({ type: "FILTER_TASKS", payload: "active" })}
      >
        Active
      </button>
    </div>
  );
}
