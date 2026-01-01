import { useNavigate } from 'react-router-dom'
import useUIStore from '../stores/uiStore'
import useCartStore from '../stores/cartStore'
import './CartDrawer.css'

function CartDrawer() {
    const navigate = useNavigate()
    const { cartOpen, closeCart } = useUIStore()
    const { items, updateQuantity, removeItem, clearCart } = useCartStore()

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const tax = subtotal * 0.1
    const total = subtotal + tax

    const handleCheckout = () => {
        closeCart()
        navigate('/checkout')
    }

    if (!cartOpen) return null

    return (
        <>
            <div className="cart-overlay" onClick={closeCart}></div>
            <div className="cart-drawer">
                <div className="drawer-header">
                    <h3>
                        <span>🛒</span> Your Cart
                    </h3>
                    <button className="close-btn" onClick={closeCart}>✕</button>
                </div>

                <div className="drawer-content">
                    {items.length === 0 ? (
                        <div className="empty-cart">
                            <span className="empty-icon">🛒</span>
                            <p>Your cart is empty</p>
                            <span className="empty-hint">Add items from the menu</span>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items-list">
                                {items.map(item => (
                                    <div key={item.id} className="cart-drawer-item">
                                        <div className="item-image">{item.image}</div>
                                        <div className="item-details">
                                            <h4>{item.name}</h4>
                                            <span className="item-price">${item.price.toFixed(2)}</span>
                                        </div>
                                        <div className="item-controls">
                                            <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                        </div>
                                        <button
                                            className="remove-item-btn"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button className="clear-cart-btn" onClick={clearCart}>
                                Clear Cart
                            </button>
                        </>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="drawer-footer">
                        <div className="cart-totals">
                            <div className="total-row">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="total-row">
                                <span>Tax (10%)</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="total-row grand-total">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button className="checkout-btn" onClick={handleCheckout}>
                            <span>💳</span>
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default CartDrawer
