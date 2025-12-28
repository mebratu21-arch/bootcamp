// src/Modal.js
import React, { Component } from "react";
import "./Modal.css"; // import styles

class Modal extends Component {
  render() {
    const { message, onClose } = this.props;
    return (
      <div className="modal-background">
        <div className="modal-body">
          <h3>Error: {message}</h3>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }
}

export default Modal;
