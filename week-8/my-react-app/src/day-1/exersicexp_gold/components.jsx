import React, { useState } from "react";

export default function Forms() {

  // Part I — Username state
  const [username, setUsername] = useState("");

  // Part IV — Multiple fields
  const [age, setAge] = useState(null);

  // Part V — Error message
  const [errorMessage, setErrorMessage] = useState("");

  // Part VI — Textarea
  const [textarea, setTextarea] = useState("Write something here...");

  // Part VII — Select dropdown
  const [car, setCar] = useState("Volvo");

  // Handle input fields
  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    if (field === "username") {
      setUsername(value);
    }

    if (field === "age") {

      // Validate numeric input
      if (isNaN(value)) {
        setErrorMessage("Age must be a number");
      } else {
        setErrorMessage("");
        setAge(value);
      }
    }
  };

  // Part III — Submit handler
  const mySubmitHandler = (e) => {
    e.preventDefault();
    alert(`Submitting user: ${username}`);
  };

  // Part II — Conditional header
  let header;

  if (username !== "") {
    header = (
      <h2>
        Hello {username} {age && `— you are ${age} years old`}
      </h2>
    );
  }

  return (
    <div style={{ padding: "20px" }}>

      <h1>React Form Exercises</h1>

      {/* Conditional header */}
      {header}

      <form onSubmit={mySubmitHandler}>

        {/* Username Input */}
        <p>Enter your name:</p>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />

        {/* Age Input */}
        <p>Enter your age:</p>
        <input
          type="text"
          name="age"
          value={age ?? ""}
          onChange={handleChange}
        />

        {/* Error message */}
        <p style={{ color: "red" }}>{errorMessage}</p>

        <br />

        <input type="submit" value="Submit" />
      </form>

      <hr />

      {/* Textarea */}
      <h3>Textarea Example</h3>
      <textarea
        value={textarea}
        onChange={(e) => setTextarea(e.target.value)}
      />

      <hr />

      {/* Select Dropdown */}
      <h3>Select Car Brand</h3>

      <select value={car} onChange={(e) => setCar(e.target.value)}>
        <option value="Volvo">Volvo</option>
        <option value="BMW">BMW</option>
        <option value="Audi">Audi</option>
        <option value="Toyota">Toyota</option>
      </select>

      <p>Selected car: {car}</p>

    </div>
  );
}
