// TaskList.js
import { useContext } from "react";
import { TaskContext } from "./TaskContext";

export default function TaskList() {
  const { tasks, dispatch } = useContext(TaskContext);

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <span
            onClick={() =>
              dispatch({ type: "TOGGLE_TASK", payload: task.id })
            }
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer"
            }}
          >
            {task.text}
          </span>

          <button
            style={{ marginLeft: "10px" }}
            onClick={() =>
              dispatch({ type: "REMOVE_TASK", payload: task.id })
            }
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
