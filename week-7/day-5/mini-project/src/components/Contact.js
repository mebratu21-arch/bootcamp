// src/components/Contact.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <section className="contact-section">
      <h2 className="contact-title">Contact us</h2>
      <p className="contact-info">
        Contact us and we will get back to you within 24 hours.
      </p>
      <div className="contact-details">
        <p><FontAwesomeIcon icon={faPhone} color="#e74c3c" /> +256 778 800 900</p>
        <p><FontAwesomeIcon icon={faEnvelope} color="#e74c3c" /> company@gmail.com</p>
      </div>
      
      <div className="contact-form">
        <h3>Contact</h3>
        <form>
          <input type="email" placeholder="email address" required />
          <textarea placeholder="comment" rows="5" required></textarea>
          <button type="submit" className="send-btn">Send</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;