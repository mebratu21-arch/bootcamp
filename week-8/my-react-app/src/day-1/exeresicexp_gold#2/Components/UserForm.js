import React, { useState } from "react";

export default function UserForm() {

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: ""
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { firstName, lastName, phone, email } = formValues;

    if (!firstName || !lastName || !phone || !email) {
      return "All fields are required";
    }

    if (isNaN(phone)) {
      return "Phone must be numeric";
    }

    if (!email.includes("@")) {
      return "Invalid email format";
    }

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setErrors(validationError);
      return;
    }

    setErrors("");
    setSubmittedData(formValues);
  };

  const resetForm = () => {
    setFormValues({
      firstName: "",
      lastName: "",
      phone: "",
      email: ""
    });

    setSubmittedData(null);
  };

  return (
    <div style={{ padding: 20 }}>

      <h2>Exercise 2 — User Form</h2>

      {/* Show form OR submitted data */}
      {!submittedData ? (

        <form onSubmit={handleSubmit}>

          <p>First Name:</p>
          <input
            type="text"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
          />

          <p>Last Name:</p>
          <input
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
          />

          <p>Phone:</p>
          <input
            type="text"
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
          />

          <p>Email:</p>
          <input
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />

          <br /><br />

          {errors && <p style={{ color: "red" }}>{errors}</p>}

          <button type="submit">Submit</button>
        </form>

      ) : (

        <div>
          <h3>✔ Form Submitted Successfully</h3>

          <p><b>Name:</b> {submittedData.firstName} {submittedData.lastName}</p>
          <p><b>Phone:</b> {submittedData.phone}</p>
          <p><b>Email:</b> {submittedData.email}</p>

          <br />

          <button onClick={resetForm}>Reset Form</button>
        </div>
      )}

    </div>
  );
}
