import React from "react";

const FormComponent = ({ formData, handleChange, handleSubmit }) => {
  return (
    <div className="form-container">
      <h1 className="form-title">Sample form</h1>
      
      {/* Form Inputs */}
      <div className="form-section beige-bg">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="form-input"
        />

        {/* Gender Radio Buttons */}
        <div className="radio-group">
          <input
            type="radio"
            name="gender"
            value="male"
            id="male"
            checked={formData.gender === "male"}
            onChange={handleChange}
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            name="gender"
            value="female"
            id="female"
            checked={formData.gender === "female"}
            onChange={handleChange}
          />
          <label htmlFor="female">Female</label>
        </div>

        {/* Destination Dropdown */}
        <select
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">-- Please Choose a destination --</option>
          <option value="Japan">Japan</option>
          <option value="Italy">Italy</option>
          <option value="Brazil">Brazil</option>
        </select>

        {/* Dietary Checkboxes */}
        <div className="checkbox-group">
          <label>Dietary restrictions:</label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="nutsFree"
              checked={formData.nutsFree}
              onChange={handleChange}
            />
            Nuts free
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="lactoseFree"
              checked={formData.lactoseFree}
              onChange={handleChange}
            />
            Lactose free
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="vegan"
              checked={formData.vegan}
              onChange={handleChange}
            />
            Vegan
          </label>
        </div>

        <button type="submit" className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {/* Results Section */}
      <div className="results-section teal-bg">
        <h2>Entered information:</h2>
        <p>Your name: {formData.firstName} {formData.lastName}</p>
        <p>Your age: {formData.age}</p>
        <p>Your gender: {formData.gender}</p>
        <p>Your destination: {formData.destination}</p>
        <p>Your dietary restrictions:</p>
        <p>*Nuts free: {formData.nutsFree ? "Yes" : "No"}</p>
        <p>*Lactose free: {formData.lactoseFree ? "Yes" : "No"}</p>
        <p>*Vegan meal: {formData.vegan ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default FormComponent;