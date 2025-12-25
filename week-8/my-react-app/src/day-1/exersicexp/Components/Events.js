import React, { useState } from "react";

export default function Events() {

  const clickMe = () => {
    alert("I was clicked");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      alert(`The Enter key was pressed, your input is: ${e.target.value}`);
    }
  };

  const [isToggleOn, setIsToggleOn] = useState(true);

  const toggle = () => {
    setIsToggleOn(!isToggleOn);
  };

  return (
    <div>
      <button onClick={clickMe}>Click Me</button>

      <br/><br/>

      <input
        type="text"
        placeholder="Type and press Enter"
        onKeyDown={handleKeyDown}
      />

      <br/><br/>

      <button onClick={toggle}>
        {isToggleOn ? "ON" : "OFF"}
      </button>
    </div>
  );
}
