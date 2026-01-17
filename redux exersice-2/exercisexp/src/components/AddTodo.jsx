import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../todoSlice';

const AddTodo = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate input - prevent empty todos
    if (text.trim()) {
      dispatch(addTodo(text.trim()));
      setText(''); // Clear input after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="todo-input"
        aria-label="New todo input"
      />
      <button type="submit" className="add-btn">
        Add Todo
      </button>
    </form>
  );
};

export default AddTodo;
