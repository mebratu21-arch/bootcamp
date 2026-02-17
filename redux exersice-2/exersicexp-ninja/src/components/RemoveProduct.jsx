import { useDispatch } from 'react-redux';
import { removeProduct } from '../features/inventory/inventorySlice';

const RemoveProduct = ({ productId }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      dispatch(removeProduct(productId));
    }
  };

  return (
    <button onClick={handleRemove} className="btn-remove" title="Remove product">
      🗑️ Remove
    </button>
  );
};

export default RemoveProduct;
