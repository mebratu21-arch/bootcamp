import React, { useState } from "react";
import Garage from "./Garage";

export default function Car({ carInfo }) {
  const [color] = useState("red");

  return (
    <div>
      <h1>This car is a {carInfo.model}</h1>
      <h3>
        This car is {color} {carInfo.model}
      </h3>

      <Garage size="small" />
    </div>
  );
}
