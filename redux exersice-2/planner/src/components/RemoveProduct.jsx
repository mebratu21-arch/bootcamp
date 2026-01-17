import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct } from '../features/inventory/inventorySlice';
import './RemoveProduct.css';

const RemoveProduct = () => {
  const [selectedProductId, setSelectedProductId] = useState('');
  const products = useSelector((state) => state.inventory.products);
  const dispatch = useDispatch();

  const handleRemove = (e) => {
    e.preventDefault();

    if (!selectedProductId) {
      alert('Please select a product to remove');
      return;
    }

    const product = products.find(p => p.id === parseInt(selectedProductId));
    if (product && window.confirm(`Are you sure you want to remove "${product.name}"?`)) {
      dispatch(removeProduct(parseInt(selectedProductId)));
      setSelectedProductId('');
    }
  };

  return (
    <div className="remove-product">
      <h2>🗑️ Remove Product</h2>
      <form onSubmit={handleRemove} className="remove-form">
        <div className="form-group">
          <label htmlFor="product-remove-select">Select Product to Remove</label>
          <select
            id="product-remove-select"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            required
          >
            <option value="">-- Choose a product --</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} (Qty: {product.quantity})
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="remove-btn">
          Remove Product
        </button>
      </form>
    </div>
  );
};

export default RemoveProduct;
