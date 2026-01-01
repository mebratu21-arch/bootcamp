import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useCartStore from '../stores/cartStore'
import './OrderHistoryPage.css'

function OrderHistoryPage() {
    const navigate = useNavigate()
    const addItem = useCartStore((state) => state.addItem)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders')
                const data = await response.json()
                if (Array.isArray(data)) {
                    // Map backend structure to frontend if needed
                    const mappedOrders = data.map(order => ({
                        id: order.id,
                        createdAt: order.createdAt,
                        status: order.orderStatus,
                        totalPrice: order.totalPrice,
                        items: order.items.map(item => ({
                            id: item.menuItemId,
                            name: item.menuItem.name,
                            quantity: item.quantity,
                            price: item.price,
                            image: item.menuItem.imageUrl || '☕'
                        }))
                    }))
                    setOrders(mappedOrders)
                }
            } catch (error) {
                console.error('Error fetching orders:', error)
            }
        }
        fetchOrders()
    }, [])

    const handleReorder = (order) => {
        order.items.forEach(item => {
            for (let i = 0; i < item.quantity; i++) {
                addItem(item)
            }
        })
        navigate('/checkout')
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffMs = now - date
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

        if (diffDays === 0) return 'Today'
        if (diffDays === 1) return 'Yesterday'
        if (diffDays < 7) return `${diffDays} days ago`
        return date.toLocaleDateString()
    }

    return (
        <div className="order-history-page">
            <div className="history-container">
                <header className="history-header">
                    <span className="section-tag">Your Orders</span>
                    <h1>Order History</h1>
                    <p>View and reorder your past orders</p>
                </header>

                {orders.length === 0 ? (
                    <div className="no-orders">
                        <span className="empty-icon">📋</span>
                        <h2>No orders yet</h2>
                        <p>Your order history will appear here</p>
                        <button onClick={() => navigate('/menu')} className="browse-btn">
                            Browse Menu
                        </button>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map((order, index) => (
                            <div
                                key={order.id}
                                className="history-card glass animate-fadeIn"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="card-header">
                                    <div className="order-info">
                                        <span className="order-id">Order #{order.id}</span>
                                        <span className="order-date">{formatDate(order.createdAt)}</span>
                                    </div>
                                    <span className={`order-status ${order.status}`}>
                                        {order.status === 'completed' ? '✓ Completed' : order.status}
                                    </span>
                                </div>

                                <div className="order-items-preview">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="preview-item">
                                            <span className="item-emoji">{item.image}</span>
                                            <div className="item-details">
                                                <span className="item-name">{item.name}</span>
                                                <span className="item-qty">x{item.quantity}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="card-footer">
                                    <div className="order-total">
                                        <span className="total-label">Total</span>
                                        <span className="total-value">${order.totalPrice.toFixed(2)}</span>
                                    </div>
                                    <button
                                        className="reorder-btn"
                                        onClick={() => handleReorder(order)}
                                    >
                                        <span>🔄</span>
                                        Reorder
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderHistoryPage
