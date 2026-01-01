import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCartStore from '../stores/cartStore'
import useOrderStore from '../stores/orderStore'
import './CheckoutPage.css'

function CheckoutPage() {
    const navigate = useNavigate()
    const { items, clearCart } = useCartStore()
    const { addOrder } = useOrderStore()
    const [step, setStep] = useState(1)
    const [isProcessing, setIsProcessing] = useState(false)

    const [deliveryInfo, setDeliveryInfo] = useState({
        name: '',
        phone: '',
        address: '',
        instructions: ''
    })

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
        name: ''
    })

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const tax = subtotal * 0.1
    const deliveryFee = subtotal > 30 ? 0 : 3.99
    const total = subtotal + tax + deliveryFee

    const handleDeliveryChange = (e) => {
        setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value })
    }

    const handlePaymentChange = (e) => {
        let value = e.target.value

        if (e.target.name === 'cardNumber') {
            value = value.replace(/\D/g, '').slice(0, 16)
            value = value.replace(/(\d{4})/g, '$1 ').trim()
        }
        if (e.target.name === 'expiry') {
            value = value.replace(/\D/g, '').slice(0, 4)
            if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2)
        }
        if (e.target.name === 'cvv') {
            value = value.replace(/\D/g, '').slice(0, 3)
        }

        setPaymentInfo({ ...paymentInfo, [e.target.name]: value })
    }

    const handleSubmit = async () => {
        setIsProcessing(true)

        const orderData = {
            items: items.map(item => ({
                id: item.id,
                quantity: item.quantity,
                price: item.price
            })),
            totalPrice: total,
            deliveryInfo: deliveryInfo
        }

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            })

            if (!response.ok) {
                throw new Error('Failed to place order')
            }

            const savedOrder = await response.json()
            addOrder(savedOrder)
            clearCart()
            setIsProcessing(false)
            navigate('/orders')
        } catch (error) {
            console.error('Error placing order:', error)
            alert('There was an error placing your order. Please try again.')
            setIsProcessing(false)
        }
    }

    if (items.length === 0) {
        return (
            <div className="checkout-page">
                <div className="empty-checkout">
                    <span className="empty-icon">🛒</span>
                    <h2>Your cart is empty</h2>
                    <p>Add some items before checking out</p>
                    <button onClick={() => navigate('/menu')} className="back-btn">
                        Browse Menu
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                <div className="checkout-main">
                    {/* Progress Steps */}
                    <div className="checkout-progress">
                        <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                            <div className="step-number">{step > 1 ? '✓' : '1'}</div>
                            <span>Delivery</span>
                        </div>
                        <div className="progress-line"></div>
                        <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                            <div className="step-number">{step > 2 ? '✓' : '2'}</div>
                            <span>Payment</span>
                        </div>
                        <div className="progress-line"></div>
                        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
                            <div className="step-number">3</div>
                            <span>Confirm</span>
                        </div>
                    </div>

                    {/* Step 1: Delivery */}
                    {step === 1 && (
                        <div className="checkout-step animate-fadeIn">
                            <h2>📍 Delivery Information</h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="John Doe"
                                        value={deliveryInfo.name}
                                        onChange={handleDeliveryChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="(123) 456-7890"
                                        value={deliveryInfo.phone}
                                        onChange={handleDeliveryChange}
                                    />
                                </div>
                                <div className="form-group full-width">
                                    <label>Delivery Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="123 Main St, City, State 12345"
                                        value={deliveryInfo.address}
                                        onChange={handleDeliveryChange}
                                    />
                                </div>
                                <div className="form-group full-width">
                                    <label>Delivery Instructions (Optional)</label>
                                    <textarea
                                        name="instructions"
                                        placeholder="Leave at door, ring doorbell, etc."
                                        value={deliveryInfo.instructions}
                                        onChange={handleDeliveryChange}
                                    />
                                </div>
                            </div>
                            <button
                                className="continue-btn"
                                onClick={() => setStep(2)}
                                disabled={!deliveryInfo.name || !deliveryInfo.phone || !deliveryInfo.address}
                            >
                                Continue to Payment →
                            </button>
                        </div>
                    )}

                    {/* Step 2: Payment */}
                    {step === 2 && (
                        <div className="checkout-step animate-fadeIn">
                            <h2>💳 Payment Method</h2>
                            <div className="payment-options">
                                <button className="payment-option active">
                                    <span>💳</span> Credit Card
                                </button>
                                <button className="payment-option disabled">
                                    <span></span> Apple Pay
                                </button>
                                <button className="payment-option disabled">
                                    <span>G</span> Google Pay
                                </button>
                            </div>

                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label>Card Number</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        placeholder="1234 5678 9012 3456"
                                        value={paymentInfo.cardNumber}
                                        onChange={handlePaymentChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Expiry Date</label>
                                    <input
                                        type="text"
                                        name="expiry"
                                        placeholder="MM/YY"
                                        value={paymentInfo.expiry}
                                        onChange={handlePaymentChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>CVV</label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        placeholder="123"
                                        value={paymentInfo.cvv}
                                        onChange={handlePaymentChange}
                                    />
                                </div>
                                <div className="form-group full-width">
                                    <label>Cardholder Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="John Doe"
                                        value={paymentInfo.name}
                                        onChange={handlePaymentChange}
                                    />
                                </div>
                            </div>

                            <div className="step-buttons">
                                <button className="back-btn" onClick={() => setStep(1)}>
                                    ← Back
                                </button>
                                <button
                                    className="continue-btn"
                                    onClick={() => setStep(3)}
                                    disabled={!paymentInfo.cardNumber || !paymentInfo.expiry || !paymentInfo.cvv}
                                >
                                    Review Order →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Confirm */}
                    {step === 3 && (
                        <div className="checkout-step animate-fadeIn">
                            <h2>✅ Confirm Order</h2>

                            <div className="confirmation-section">
                                <h4>📍 Delivery To</h4>
                                <p>{deliveryInfo.name}</p>
                                <p>{deliveryInfo.address}</p>
                                <p>{deliveryInfo.phone}</p>
                            </div>

                            <div className="confirmation-section">
                                <h4>💳 Payment</h4>
                                <p>Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
                            </div>

                            <div className="step-buttons">
                                <button className="back-btn" onClick={() => setStep(2)}>
                                    ← Back
                                </button>
                                <button
                                    className="place-order-btn"
                                    onClick={handleSubmit}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? (
                                        <>
                                            <span className="spinner"></span>
                                            Processing...
                                        </>
                                    ) : (
                                        <>🎉 Place Order - ${total.toFixed(2)}</>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Order Summary Sidebar */}
                <aside className="order-summary glass">
                    <h3>Order Summary</h3>

                    <div className="summary-items">
                        {items.map(item => (
                            <div key={item.id} className="summary-item">
                                <span className="item-emoji">{item.image}</span>
                                <div className="item-info">
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-qty">x{item.quantity}</span>
                                </div>
                                <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="summary-totals">
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax (10%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Delivery</span>
                            <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                        </div>
                        {deliveryFee > 0 && (
                            <p className="free-delivery-hint">
                                Add ${(30 - subtotal).toFixed(2)} more for free delivery!
                            </p>
                        )}
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default CheckoutPage
