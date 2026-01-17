import { useSelector } from 'react-redux';
import './InventoryList.css';

const InventoryList = () => {
  const products = useSelector((state) => state.inventory.products);

  return (
    <div className="inventory-list">
      <h2>📦 Inventory List</h2>
      {products.length === 0 ? (
        <p className="empty-message">No products in inventory. Add some products to get started!</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-header">
                <h3>{product.name}</h3>
                <span className="product-id">#{product.id}</span>
              </div>
              <div className="product-details">
                <div className="detail-item">
                  <span className="label">Quantity:</span>
                  <span className="value">{product.quantity}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Price:</span>
                  <span className="value">${product.price.toFixed(2)}</span>
                </div>
                <div className="detail-item total">
                  <span className="label">Total Value:</span>
                  <span className="value">${(product.quantity * product.price).toFixed(2)}</span>
                </div>
              </div>
              {product.quantity < 10 && product.quantity > 0 && (
                <div className="low-stock-warning">⚠️ Low Stock</div>
              )}
              {product.quantity === 0 && (
                <div className="out-of-stock-warning">❌ Out of Stock</div>
              )}
            </div>
          ))}
        </div>
      )}
      {products.length > 0 && (
        <div className="inventory-summary">
          <h3>Summary</h3>
          <p>Total Products: {products.length}</p>
          <p>Total Items: {products.reduce((sum, p) => sum + p.quantity, 0)}</p>
          <p>Total Value: ${products.reduce((sum, p) => sum + (p.quantity * p.price), 0).toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default InventoryList;
