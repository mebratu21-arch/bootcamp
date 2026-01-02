// TaskList.js
import { useContext, useRef, useState } from "react";
import { TaskContext } from "./TaskContext";

export default function TaskList() {
  const { state, dispatch } = useContext(TaskContext);
  const [editingId, setEditingId] = useState(null);
  const editRef = useRef();

  const filteredTasks = state.tasks.filter(task => {
    if (state.filter === "completed") return task.completed;
    if (state.filter === "active") return !task.completed;
    return true;
  });

  const saveEdit = (id) => {
    const newText = editRef.current.value;
    dispatch({ type: "EDIT_TASK", payload: { id, text: newText } });
    setEditingId(null);
  };

  return (
    <ul style={{ marginTop: "20px" }}>
      {filteredTasks.map(task => (
        <li key={task.id} style={{ marginBottom: "10px" }}>
          {editingId === task.id ? (
            <>
              <input
                defaultValue={task.text}
                ref={editRef}
              />
              <button onClick={() => saveEdit(task.id)}>Save</button>
            </>
          ) : (
            <>
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
                onClick={() => setEditingId(task.id)}
              >
                Edit
              </button>

              <button
                style={{ marginLeft: "10px" }}
                onClick={() =>
                  dispatch({ type: "REMOVE_TASK", payload: task.id })
                }
              >
                Remove
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
