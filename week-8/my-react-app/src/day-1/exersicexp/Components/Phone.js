import React, { useState } from "react";

export default function Phone() {

  const [phone, setPhone] = useState({
    brand: "Samsung",
    model: "Galaxy S20",
    color: "black",
    year: 2020
  });

  const changeColor = () => {
    setPhone({ ...phone, color: "blue" });
  };

  return (
    <div>
      <h1>My phone is a {phone.brand}</h1>
      <h3>
        It is a {phone.color} {phone.model} from {phone.year}
      </h3>

      <button onClick={changeColor}>Change color</button>
    </div>
  );
}
