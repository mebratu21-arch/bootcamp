import React, { useState, useEffect } from "react";

export default function Color() {

  const [favoriteColor, setFavoriteColor] = useState("red");

  useEffect(() => {
    alert("useEffect reached");
  }, [favoriteColor]);

  return (
    <div>
      <h1>{favoriteColor}</h1>

      <button onClick={() => setFavoriteColor("blue")}>
        Change Color
      </button>
    </div>
  );
}
