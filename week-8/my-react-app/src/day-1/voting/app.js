import { useState } from "react";

function App() {

  const [languages, setLanguages] = useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaScript", votes: 0 },
    { name: "Java", votes: 0 }
  ]);

  // Function to increase vote count
  const handleVote = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].votes += 1;
    setLanguages(updatedLanguages);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Voting App</h1>

      {languages.map((lang, index) => (
        <div key={index} style={{ margin: "10px" }}>
          <span style={{ fontSize: "18px", marginRight: "10px" }}>
            {lang.name} — Votes: {lang.votes}
          </span>

          <button onClick={() => handleVote(index)}>
            Vote
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
