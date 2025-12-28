// src/App.js
import React, { Component } from "react";
import ErrorBoundary from "./ErrorBoundary";

class App extends Component {
  render() {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Modal with Error Handling</h1>

        <ErrorBoundary>
          <button onClick={() => { throw new Error("Button clicked!"); }}>
            Occur an error
          </button>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
