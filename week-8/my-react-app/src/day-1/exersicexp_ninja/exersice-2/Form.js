import React, { useState } from "react";
import Input from "./Input";

export default function Form() {

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: ""
  });

  const [errors, setErrors] = useState({});

  // --- REGEX VALIDATION RULES ---
  const phoneRegex = /^[0-9]{9,15}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (name, value) => {
    let message = "";

    if (!value.trim()) {
      if (name === "firstName") message = "First name is required";
      if (name === "lastName") message = "Last name is required";
      if (name === "email") message = "Email is required";
    }

    if (name === "phone" && value && !phoneRegex.test(value)) {
      message = "Phone number is invalid";
    }

    if (name === "email" && value && !emailRegex.test(value)) {
      message = "Email is invalid";
    }

    return message;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues(prev => ({ ...prev, [name]: value }));

    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate all fields before submit
    const newErrors = {};

    Object.keys(values).forEach(field => {
      const err = validateField(field, values[field]);
      if (err) newErrors[field] = err;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", values);
      alert("Form Submitted Successfully!");
    }
  };

  return (
    <div style={{ padding: 30, width: 400 }}>

      <h2>React Form Validation</h2>

      <form onSubmit={handleSubmit} noValidate>

        <Input
          label="First Name"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />

        <Input
          label="Last Name"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />

        <Input
          label="Phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <Input
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        <button type="submit">
          Submit
        </button>

      </form>
    </div>
  );
}
