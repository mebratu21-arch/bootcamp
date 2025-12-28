// src/ErrorBoundary.js
import React, { Component } from "react";
import Modal from "./Modal";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorInfo: null
  };

  // Called when a child throws an error
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  occurError = () => {
    this.setState({ hasError: true });
  };

  closeModal = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Modal
          message="Something went wrong!"
          onClose={this.closeModal}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
