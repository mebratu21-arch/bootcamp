import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../features/inventory/inventorySlice';
import UpdateQuantity from './UpdateQuantity';
import RemoveProduct from './RemoveProduct';

const InventoryList = () => {
  const dispatch = useDispatch();
  const { products, categories, currentCategory } = useSelector((state) => state.inventory);

  const filteredProducts = currentCategory === 'All' 
    ? products 
    : products.filter(p => p.category === currentCategory);

  return (
    <div className="inventory-list">
      <h2>📊 Current Inventory</h2>
      
      <div className="category-filters">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={currentCategory === cat ? 'active' : ''}
            onClick={() => dispatch(setCategory(cat))}
          >
            {cat}
          </button>
        ))}
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td className="product-name">{product.name}</td>
              <td className="product-category">{product.category}</td>
              <td className="product-price">${product.price.toFixed(2)}</td>
              <td className="product-quantity">
                <UpdateQuantity product={product} />
              </td>
              <td className="product-actions">
                <RemoveProduct productId={product.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="inventory-summary">
        <p><strong>Total Products:</strong> {products.length}</p>
        <p><strong>Total Items:</strong> {products.reduce((sum, p) => sum + p.quantity, 0)}</p>
        <p><strong>Total Value:</strong> ${products.reduce((sum, p) => sum + (p.quantity * p.price), 0).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default InventoryList;
