import React from 'react';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { removeCategory } from '../actions';

const CategorySection = ({ category, todos, removeCategory }) => {
  return (
    <div className="category-section" style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '5px', marginBottom: '10px' }}>
        <h3 style={{ margin: 0 }}>{category}</h3>
        <button 
          onClick={() => removeCategory(category)}
          style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer', fontSize: '12px' }}
        >
          Remove Category
        </button>
      </div>
      
      {todos.length === 0 ? (
        <p className="empty-message" style={{ fontSize: '14px' }}>No todos in this category.</p>
      ) : (
        <ul className="todo-list">
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} category={category} />
          ))}
        </ul>
      )}
    </div>
  );
};

const mapDispatchToProps = { removeCategory };

export default connect(null, mapDispatchToProps)(CategorySection);
