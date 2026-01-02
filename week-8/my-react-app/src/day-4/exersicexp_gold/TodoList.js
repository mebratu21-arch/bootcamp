// TodoList.js
import { useReducer, useState } from "react";
import { todoReducer } from "./todoReducer";

export default function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim() === "") return;

    dispatch({ type: "ADD_TODO", payload: text });
    setText("");
  };

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  };

  return (
    <div>
      <h2>Todo List</h2>

      <input
        type="text"
        value={text}
        placeholder="Add a todo..."
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => handleRemove(todo.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
