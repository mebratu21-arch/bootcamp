import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo, addCategory } from '../actions';
import '../TodoApp.css'; 

const AddTodo = ({ categories, addTodo, addCategory }) => {
  const [text, setText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || 'Work');
  const [newCategory, setNewCategory] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(selectedCategory, text);
    setText('');
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    addCategory(newCategory);
    setNewCategory('');
    setIsAddingCategory(false);
    setSelectedCategory(newCategory);
  };

  return (
    <div className="add-todo-container" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
      <form onSubmit={handleAddTodo} style={{ width: '100%', display: 'flex' }}>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '10px', borderRadius: '4px 0 0 4px', border: '1px solid #ddd', borderRight: 'none' }}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          placeholder="New todo..."
          style={{ borderRadius: '0', flexGrow: 1 }}
        />
        <button type="submit" style={{ borderRadius: '0 4px 4px 0' }}>Add</button>
      </form>

      <div style={{ marginTop: '10px' }}>
        {isAddingCategory ? (
          <form onSubmit={handleAddCategory} style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              type="text" 
              value={newCategory} 
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New Category Name"
              style={{ padding: '5px', marginRight: '5px' }}
            />
            <button type="submit" className="edit-btn">Save</button>
            <button type="button" onClick={() => setIsAddingCategory(false)} className="delete-btn">Cancel</button>
          </form>
        ) : (
          <button 
            type="button" 
            onClick={() => setIsAddingCategory(true)}
            style={{ background: 'none', color: '#007bff', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            + New Category
          </button>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = { addTodo, addCategory };

export default connect(null, mapDispatchToProps)(AddTodo);
