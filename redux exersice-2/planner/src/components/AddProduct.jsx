import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../features/inventory/inventorySlice';
import './AddProduct.css';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim() || !quantity || !price) {
      alert('Please fill in all fields');
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      quantity: parseInt(quantity),
      price: parseFloat(price)
    };

    dispatch(addProduct(newProduct));
    
    // Reset form
    setName('');
    setQuantity('');
    setPrice('');
  };

  return (
    <div className="add-product">
      <h2>➕ Add New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
