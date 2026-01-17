import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState<number>(0);
  const [lastAction, setLastAction] = useState<string>('None');

  const increment = () => {
    setCount((prev) => prev + 1);
    setLastAction('Increment');
  };

  const decrement = () => {
    setCount((prev) => prev - 1);
    setLastAction('Decrement');
  };

  return (
    <div className="card">
      <h2>Exercise 3: Counter</h2>
      <div className="counter-display">
        <p>Count: {count}</p>
        <p>Last Action: {lastAction}</p>
      </div>
      <div className="button-group">
        <button onClick={increment}>Increment (+)</button>
        <button onClick={decrement}>Decrement (-)</button>
      </div>
    </div>
  );
};

export default Counter;
