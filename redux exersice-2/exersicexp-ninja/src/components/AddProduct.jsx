import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../features/inventory/inventorySlice';

const AddProduct = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.inventory.categories.filter(c => c !== 'All'));
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    category: categories[0] || 'Uncategorized',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      alert('Please enter a product name');
      return;
    }
    if (!formData.quantity || formData.quantity <= 0) {
      alert('Please enter a valid quantity');
      return;
    }
    if (!formData.price || formData.price <= 0) {
      alert('Please enter a valid price');
      return;
    }

    dispatch(addProduct(formData));
    
    // Clear form
    setFormData({
      name: '',
      quantity: '',
      price: '',
      category: categories[0] || 'Uncategorized',
    });
  };

  return (
    <div className="add-product">
      <h2>➕ Add New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            min="1"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Price ($):</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="category-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <button type="submit" className="btn-add">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
