// CharacterCounter.js
import { useRef, useState } from "react";

export default function CharacterCounter() {
  const inputRef = useRef(null);
  const [count, setCount] = useState(0);

  const handleInput = () => {
    const length = inputRef.current.value.length;
    setCount(length);
  };

  return (
    <div>
      <h2>Character Counter</h2>
      <input
        type="text"
        ref={inputRef}
        onInput={handleInput}
        placeholder="Type something..."
      />
      <p>Characters: {count}</p>
    </div>
  );
}
