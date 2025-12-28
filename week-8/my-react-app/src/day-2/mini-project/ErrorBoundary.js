// src/ErrorBoundary.js
import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  // Lifecycle method triggered when a child throws an error
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="card my-5" style={{ padding: "20px", border: "1px solid red" }}>
          <h3>Something went wrong.</h3>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </details>
          <button onClick={() => window.location.reload()}>Reload this page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
