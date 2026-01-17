import React from 'react';
import { Provider, connect } from 'react-redux';
import store from './store';
import AddTodo from './components/AddTodo';
import CategorySection from './components/CategorySection';
import './TodoApp.css'; // Updated to local file

const TodoListContent = ({ categories, todos }) => {
  return (
    <div className="todo-app-container" style={{ maxWidth: '600px' }}>
      <h1>Todo Categories (XP Gold)</h1>
      <AddTodo categories={categories} />
      <div className="categories-container" style={{ marginTop: '20px' }}>
        {categories.map(cat => (
          <CategorySection key={cat} category={cat} todos={todos[cat]} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: Object.keys(state),
  todos: state
});

const ConnectedContent = connect(mapStateToProps)(TodoListContent);

const TodoAppGold = () => {
  return (
    <Provider store={store}>
      <ConnectedContent />
    </Provider>
  );
};

export default TodoAppGold;
