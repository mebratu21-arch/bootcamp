import React, { useState, useEffect } from "react";
import FormComponent from "./components/FormComponent";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    destination: "",
    nutsFree: false,
    lactoseFree: false,
    vegan: false,
  });

  // Parse URL params on load (bonus feature! 🌟)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const loadedData = {
      firstName: urlParams.get("firstName") || "",
      lastName: urlParams.get("lastName") || "",
      age: urlParams.get("age") || "",
      gender: urlParams.get("gender") || "",
      destination: urlParams.get("destination") || "",
      nutsFree: urlParams.get("nutsFree") === "on",
      lactoseFree: urlParams.get("lactoseFree") === "on",
      vegan: urlParams.get("vegan") === "on",
    };
    setFormData(loadedData);
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        params.append(key, typeof value === "boolean" ? "on" : value);
      }
    });

    // Navigate with query params (matches exact requirement!)
    window.location.href = `http://localhost:3000/?${params.toString()}`;
  };

  return (
    <div className="app">
      <FormComponent 
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;