import useUIStore from '../stores/uiStore'
import useCartStore from '../stores/cartStore'
import './FloatingCart.css'

function FloatingCart() {
    const { openCart } = useUIStore()
    const items = useCartStore((state) => state.items)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    if (itemCount === 0) return null

    return (
        <button className="floating-cart-btn" onClick={openCart}>
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{itemCount}</span>
            <span className="cart-label">View Cart</span>
        </button>
    )
}

export default FloatingCart
