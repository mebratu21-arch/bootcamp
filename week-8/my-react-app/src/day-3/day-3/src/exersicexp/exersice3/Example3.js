import React from "react";
import data from "./complexData.json";

class Example3 extends React.Component {
  render() {
    return (
      <div>
        {data.Experiences.map((exp, index) => (
          <div key={index}>
            <h4>{exp.company}</h4>
            <p>{exp.role} - {exp.location} ({exp.date})</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Example3;
