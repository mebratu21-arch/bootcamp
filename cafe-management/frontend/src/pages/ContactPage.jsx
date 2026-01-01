import { useState } from 'react'
import './ContactPage.css'

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Simulate form submission
        setSubmitted(true)
    }

    return (
        <div className="contact-page">
            <div className="contact-container">
                <header className="contact-header">
                    <span className="section-tag">Get In Touch</span>
                    <h1>Contact Us</h1>
                    <p>We'd love to hear from you. Send us a message!</p>
                </header>

                <div className="contact-content">
                    <div className="contact-info glass">
                        <h3>📍 Visit Us</h3>
                        <div className="info-item">
                            <span className="info-icon">🏠</span>
                            <div>
                                <strong>Address</strong>
                                <p>123 Coffee Street, Downtown</p>
                                <p>New York, NY 10001</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <span className="info-icon">📞</span>
                            <div>
                                <strong>Phone</strong>
                                <a href="tel:+1234567890">(123) 456-7890</a>
                            </div>
                        </div>

                        <div className="info-item">
                            <span className="info-icon">✉️</span>
                            <div>
                                <strong>Email</strong>
                                <a href="mailto:hello@cafeelegante.com">hello@cafeelegante.com</a>
                            </div>
                        </div>

                        <div className="info-item">
                            <span className="info-icon">🕐</span>
                            <div>
                                <strong>Hours</strong>
                                <p>Mon - Fri: 7am - 9pm</p>
                                <p>Sat - Sun: 8am - 10pm</p>
                            </div>
                        </div>

                        <div className="social-section">
                            <h4>Follow Us</h4>
                            <div className="social-links">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn">📘 Facebook</a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn">📸 Instagram</a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-btn">🐦 Twitter</a>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-section glass">
                        {submitted ? (
                            <div className="success-message">
                                <span className="success-icon">✅</span>
                                <h3>Message Sent!</h3>
                                <p>Thank you for contacting us. We'll get back to you soon.</p>
                                <button onClick={() => setSubmitted(false)} className="send-another-btn">
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3>📝 Send a Message</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Your Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            placeholder="How can we help?"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Message</label>
                                        <textarea
                                            name="message"
                                            placeholder="Your message..."
                                            rows="5"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="submit-btn">
                                        <span>📤</span>
                                        Send Message
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage
