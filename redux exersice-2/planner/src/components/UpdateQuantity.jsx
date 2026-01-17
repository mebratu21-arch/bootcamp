import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity } from '../features/inventory/inventorySlice';
import './UpdateQuantity.css';

const UpdateQuantity = () => {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const products = useSelector((state) => state.inventory.products);
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!selectedProductId || newQuantity === '') {
      alert('Please select a product and enter a quantity');
      return;
    }

    dispatch(updateQuantity({
      id: parseInt(selectedProductId),
      quantity: parseInt(newQuantity)
    }));

    // Reset form
    setSelectedProductId('');
    setNewQuantity('');
  };

  return (
    <div className="update-quantity">
      <h2>✏️ Update Quantity</h2>
      <form onSubmit={handleUpdate} className="update-form">
        <div className="form-group">
          <label htmlFor="product-select">Select Product</label>
          <select
            id="product-select"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            required
          >
            <option value="">-- Choose a product --</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} (Current: {product.quantity})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="new-quantity">New Quantity</label>
          <input
            type="number"
            id="new-quantity"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            placeholder="Enter new quantity"
            min="0"
            required
          />
        </div>

        <button type="submit" className="update-btn">
          Update Quantity
        </button>
      </form>
    </div>
  );
};

export default UpdateQuantity;
