// src/columns/ColumnRight.js
import React, { useState } from "react";
import ErrorBoundary from "../ErrorBoundary";

function ColumnRight() {
  const [content, setContent] = useState(
    "Clicking the button will replace this string with an object."
  );

  const replaceWithObject = () => {
    setContent({ function: "I live to crash" }); // triggers error
  };

  return (
    <div>
      <p>{content}</p>

      <ErrorBoundary>
        <p>{content}</p> {/* This paragraph will crash, handled by ErrorBoundary */}
      </ErrorBoundary>

      <button className="btn btn-danger" onClick={replaceWithObject}>
        Replace string with object
      </button>
    </div>
  );
}

export default ColumnRight;
