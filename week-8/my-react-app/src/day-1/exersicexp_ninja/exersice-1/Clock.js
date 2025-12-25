import React, { useState, useEffect } from "react";

export default function Clock() {

  const [currentDate, setCurrentDate] = useState(new Date());

  const tick = () => {
    setCurrentDate(new Date());
  };

  useEffect(() => {
    const timer = setInterval(tick, 1000);

    // cleanup when component unmounts
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <h2>Local Time</h2>
      <h1>{currentDate.toLocaleTimeString()}</h1>
    </div>
  );
}
