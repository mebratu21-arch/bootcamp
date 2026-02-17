import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
}

const GroceryList = () => {
  const [items, setItems] = useLocalStorage<GroceryItem[]>('gold-grocery-list', []);
  const [newItemName, setNewItemName] = useState('');

  const addItem = () => {
    if (!newItemName.trim()) return;
    const newItem: GroceryItem = {
      id: crypto.randomUUID(),
      name: newItemName,
      quantity: 1,
    };
    setItems([...items, newItem]);
    setNewItemName('');
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="exercise-section">
      <h2>Gold Exercise 3: Persistent Grocery Explorer</h2>
      <div className="grocery-input">
        <input
          type="text"
          placeholder="New grocery item..."
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      <ul className="grocery-list">
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      {items.length === 0 && <p>Your list is empty. Add something above!</p>}
    </div>
  );
};

export default GroceryList;
