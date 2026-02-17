import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logoutUser, addTodo, toggleTodo, deleteTodo, editTodo } from '../actions';

const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      editTodo(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <input 
          type="text" 
          value={editText} 
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
          className="edit-input"
          autoFocus
        />
      ) : (
        <span 
          onClick={() => toggleTodo(todo.id)}
          style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
        >
          {todo.text}
        </span>
      )}
      
      <button className="edit-btn" onClick={handleEdit}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
      <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
        Delete
      </button>
    </li>
  );
};

const TodoApp = ({ currentUser, todos, logoutUser, addTodo, toggleTodo, deleteTodo, editTodo }) => {
  const [text, setText] = useState('');
  
  const userTodos = todos[currentUser] || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText('');
  };

  return (
    <div className="todo-app-container">
      <div className="todo-header">
        <h1>✅ My Todos</h1>
        <div className="user-info">
          <span>Welcome, <strong>{currentUser}</strong>!</span>
          <button onClick={logoutUser} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="add-todo-container">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new todo..."
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>

      <div className="todo-list-container">
        {userTodos.length === 0 ? (
          <p className="empty-message">No todos yet. Add one above!</p>
        ) : (
          <ul className="todo-list">
            {userTodos.map(todo => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  todos: state.todos
});

const mapDispatchToProps = {
  logoutUser,
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
