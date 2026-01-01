import { useState, useEffect } from 'react'
import useOrderStore from '../stores/orderStore'
import './OrderStatusPage.css'

const getDemoOrder = () => ({
    id: 12345,
    status: 'preparing',
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    estimatedTime: '15-20 min',
    totalPrice: 24.50,
    items: [
        { name: 'Cappuccino', quantity: 2, price: 4.50 },
        { name: 'Butter Croissant', quantity: 1, price: 4.00 },
        { name: 'Avocado Toast', quantity: 1, price: 9.50 }
    ]
})

function OrderStatusPage() {
    const { currentOrder, orders } = useOrderStore()
    const [activeOrder, setActiveOrder] = useState(() => getDemoOrder())

    useEffect(() => {
        const fetchOrderStatus = async (id) => {
            try {
                const response = await fetch(`http://localhost:5000/api/orders/${id}`)
                const order = await response.json()
                setActiveOrder({
                    id: order.id,
                    status: order.orderStatus,
                    createdAt: order.createdAt,
                    totalPrice: order.totalPrice,
                    items: order.items.map(item => ({
                        name: item.menuItem.name,
                        quantity: item.quantity,
                        price: item.price
                    }))
                })
            } catch (error) {
                console.error('Error fetching order status:', error)
            }
        }

        if (currentOrder?.id) {
            fetchOrderStatus(currentOrder.id)
        } else if (orders.length > 0) {
            fetchOrderStatus(orders[0].id)
        }
    }, [currentOrder, orders])

    const statuses = [
        { key: 'pending', label: 'Order Received', icon: '📝', description: 'Your order has been received' },
        { key: 'confirmed', label: 'Confirmed', icon: '✅', description: 'Order confirmed by the café' },
        { key: 'preparing', label: 'Preparing', icon: '👨‍🍳', description: 'Your order is being prepared' },
        { key: 'ready', label: 'Ready', icon: '🎉', description: 'Your order is ready!' },
        { key: 'completed', label: 'Completed', icon: '✨', description: 'Order completed' }
    ]

    const getStatusIndex = (status) => {
        const index = statuses.findIndex(s => s.key === status)
        return index >= 0 ? index : 0
    }

    if (!activeOrder) {
        return (
            <div className="order-status-page">
                <div className="no-order">
                    <span className="empty-icon">📦</span>
                    <h2>No Active Orders</h2>
                    <p>Place an order to track it here</p>
                </div>
            </div>
        )
    }

    const currentStatusIndex = getStatusIndex(activeOrder.status)

    return (
        <div className="order-status-page">
            <div className="status-container">
                <header className="status-header">
                    <span className="section-tag">Order Tracking</span>
                    <h1>Order #{activeOrder.id}</h1>
                    <p className="order-time">
                        Placed {new Date(activeOrder.createdAt).toLocaleTimeString()}
                    </p>
                </header>

                {/* Status Timeline */}
                <div className="status-timeline">
                    {statuses.map((status, index) => (
                        <div
                            key={status.key}
                            className={`timeline-step ${index <= currentStatusIndex ? 'completed' : ''} ${index === currentStatusIndex ? 'current' : ''}`}
                        >
                            <div className="step-indicator">
                                <span className="step-icon">{status.icon}</span>
                                {index < statuses.length - 1 && (
                                    <div className={`step-line ${index < currentStatusIndex ? 'filled' : ''}`}></div>
                                )}
                            </div>
                            <div className="step-content">
                                <h4>{status.label}</h4>
                                <p>{status.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Current Status Card */}
                <div className="current-status-card glass">
                    <div className="status-animation">
                        <span className="status-emoji">
                            {statuses[currentStatusIndex]?.icon}
                        </span>
                    </div>
                    <div className="status-info">
                        <h3>{statuses[currentStatusIndex]?.label}</h3>
                        <p>{statuses[currentStatusIndex]?.description}</p>
                        {activeOrder.status === 'preparing' && (
                            <span className="eta">Estimated time: {activeOrder.estimatedTime || '15-20 min'}</span>
                        )}
                        {activeOrder.status === 'ready' && (
                            <span className="ready-text">🎉 Pick up your order now!</span>
                        )}
                    </div>
                </div>

                {/* Order Details */}
                <div className="order-details glass">
                    <h3>Order Details</h3>
                    <div className="order-items">
                        {activeOrder.items?.map((item, index) => (
                            <div key={index} className="order-item">
                                <span className="item-qty">{item.quantity}x</span>
                                <span className="item-name">{item.name}</span>
                                <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="order-total">
                        <span>Total</span>
                        <span>${activeOrder.totalPrice?.toFixed(2)}</span>
                    </div>
                </div>

                {/* Help Section */}
                <div className="need-help">
                    <p>Need help with your order?</p>
                    <button className="help-link">Contact Support →</button>
                </div>
            </div>
        </div>
    )
}

export default OrderStatusPage
