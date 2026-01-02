// AddTask.js
import { useState, useContext } from "react";
import { TaskContext } from "./TaskContext";

export default function AddTask() {
  const [text, setText] = useState("");
  const { dispatch } = useContext(TaskContext);

  const handleAdd = () => {
    if (!text.trim()) return;
    dispatch({ type: "ADD_TASK", payload: text });
    setText("");
  };

  return (
    <div>
      <input
        value={text}
        placeholder="Add task..."
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
