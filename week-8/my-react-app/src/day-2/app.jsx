import React, { useState } from "react";

function App() {
  const [languages, setLanguages] = useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaSript", votes: 0 }, // keeping the original spelling
    { name: "Java", votes: 0 }
  ]);

  // Increase vote count for a specific language
  const addVote = (index) => {
    const updated = [...languages];
    updated[index].votes += 1;
    setLanguages(updated);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Vote Your Language!</h1>

      {languages.map((lang, index) => (
        <div
          key={index}
          style={{
            background: "#f5deb3",
            padding: "10px",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            gap: "15px"
          }}
        >
          <span>{lang.votes}</span>
          <span>{lang.name}</span>
          <button
            onClick={() => addVote(index)}
            style={{ background: "green", color: "white", padding: "5px 10px" }}
          >
            Click Here
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
