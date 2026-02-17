import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

const TodoList = () => {
  // Select todos from Redux store with memoization
  const todos = useSelector((state) => state.todos.todos);

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos yet. Add one above to get started!</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
