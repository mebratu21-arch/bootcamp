import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem, updateItem, selectAllInventory } from './inventorySlice'

const InventoryManager = () => {
  const dispatch = useDispatch()
  const inventory = useSelector(selectAllInventory)
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)

  const handleAdd = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    dispatch(addItem({ id: Date.now().toString(), name, quantity: Number(quantity) }))
    setName('')
    setQuantity(1)
  }

  return (
    <div className="inventory-manager">
      <h2>Gold Exercise 2: Entity Adapter Inventory</h2>
      
      <form onSubmit={handleAdd} className="inventory-form">
        <input 
          type="text" 
          placeholder="Product Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Qty" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          min="1"
        />
        <button type="submit">Add Product</button>
      </form>

      <div className="inventory-list">
        {inventory.length === 0 ? (
          <p className="empty-msg">Inventory is empty. Add some products!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <button onClick={() => dispatch(updateItem({ id: item.id, changes: { quantity: Math.max(0, item.quantity - 1) } }))}>-</button>
                    <span className="qty-val">{item.quantity}</span>
                    <button onClick={() => dispatch(updateItem({ id: item.id, changes: { quantity: item.quantity + 1 } }))}>+</button>
                  </td>
                  <td>
                    <button className="del-btn" onClick={() => dispatch(removeItem(item.id))}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default InventoryManager
