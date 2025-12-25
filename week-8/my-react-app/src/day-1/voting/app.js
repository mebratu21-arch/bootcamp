// App.js
import React, { useState } from "react";

function App() {
  // Step 1: Create state with languages and votes
  const [languages, setLanguages] = useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaScript", votes: 0 },
    { name: "Java", votes: 0 },
  ]);

  // Step 2: Function to handle voting
  const handleVote = (languageName) => {
    // Map through the languages array and increment the vote for the clicked language
    const updatedLanguages = languages.map((lang) => {
      if (lang.name === languageName) {
        return { ...lang, votes: lang.votes + 1 }; // Increase vote by 1
      }
      return lang;
    });

    // Update the state with the new array
    setLanguages(updatedLanguages);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Vote for Your Favorite Language</h1>
      {languages.map((lang) => (
        <div key={lang.name} style={{ margin: "10px" }}>
          <button onClick={() => handleVote(lang.name)}>
            {lang.name}
          </button>
          <span style={{ marginLeft: "10px" }}>Votes: {lang.votes}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
