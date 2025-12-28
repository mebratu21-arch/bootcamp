// src/App.js
import React from "react";
import ColumnLeft from "./columns/ColumnLeft";
import ColumnRight from "./columns/ColumnRight";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Left column</h2>
          <ColumnLeft />
        </div>
        <div className="col">
          <h2>Right column</h2>
          <ErrorBoundary>
            <ColumnRight />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export default App;
