import { useState } from 'react'
import './HelpButton.css'

function HelpButton() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="help-container">
            {isOpen && (
                <div className="help-popup glass">
                    <div className="help-header">
                        <h4>Need Help?</h4>
                        <button className="help-close" onClick={() => setIsOpen(false)}>✕</button>
                    </div>
                    <div className="help-content">
                        <p>We're here to assist you!</p>
                        <div className="help-options">
                            <a href="tel:+1234567890" className="help-option">
                                <span>📞</span>
                                <div>
                                    <strong>Call Us</strong>
                                    <span>(123) 456-7890</span>
                                </div>
                            </a>
                            <a href="mailto:support@cafe.com" className="help-option">
                                <span>✉️</span>
                                <div>
                                    <strong>Email</strong>
                                    <span>support@cafe.com</span>
                                </div>
                            </a>
                            <button className="help-option chat">
                                <span>💬</span>
                                <div>
                                    <strong>Live Chat</strong>
                                    <span>Available 9am-9pm</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <button
                className={`help-btn ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? '✕' : '❓'}
            </button>
        </div>
    )
}

export default HelpButton
