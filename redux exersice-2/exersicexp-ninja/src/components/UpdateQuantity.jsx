import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity } from '../features/inventory/inventorySlice';

const UpdateQuantity = ({ product }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(product.quantity);

  const handleIncrement = () => {
    const newQuantity = product.quantity + 1;
    dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
  };

  const handleDecrement = () => {
    if (product.quantity > 0) {
      const newQuantity = product.quantity - 1;
      dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setQuantity(product.quantity);
  };

  const handleSave = () => {
    if (quantity >= 0) {
      dispatch(updateQuantity({ id: product.id, quantity }));
      setIsEditing(false);
    } else {
      alert('Quantity cannot be negative');
    }
  };

  const handleCancel = () => {
    setQuantity(product.quantity);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="quantity-edit">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="0"
          className="quantity-input"
        />
        <button onClick={handleSave} className="btn-save">✓</button>
        <button onClick={handleCancel} className="btn-cancel">✗</button>
      </div>
    );
  }

  return (
    <div className="quantity-controls">
      <button onClick={handleDecrement} className="btn-quantity">−</button>
      <span className="quantity-value" onClick={handleEdit} title="Click to edit">
        {product.quantity}
      </span>
      <button onClick={handleIncrement} className="btn-quantity">+</button>
    </div>
  );
};

export default UpdateQuantity;
