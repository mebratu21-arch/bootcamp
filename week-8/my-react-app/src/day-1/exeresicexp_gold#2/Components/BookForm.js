import React, { useState } from "react";

export default function BookForm() {

  const [book, setBook] = useState({
    title: "",
    author: "",
  });

  const [submittedBook, setSubmittedBook] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send object to state
    setSubmittedBook(book);

    // Display in console
    console.log("Book Submitted:", book);

    // Success message
    setMessage("📚 Book successfully added!");
  };

  return (
    <div style={{ padding: 20 }}>

      <h2>Exercise 1 — Book Form</h2>

      <form onSubmit={handleSubmit}>

        <p>Book Title:</p>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
        />

        <p>Author:</p>
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Save Book</button>
      </form>

      <br />

      {message && <h3 style={{ color: "green" }}>{message}</h3>}

      {submittedBook && (
        <div>
          <p><b>Title:</b> {submittedBook.title}</p>
          <p><b>Author:</b> {submittedBook.author}</p>
        </div>
      )}

    </div>
  );
}
