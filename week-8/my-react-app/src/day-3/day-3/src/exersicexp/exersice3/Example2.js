import React from "react";
import data from "./complexData.json";

class Example2 extends React.Component {
  render() {
    return (
      <div>
        {Object.entries(data.Skills).map(([category, skills]) => (
          <div key={category}>
            <h4>{category}</h4>
            <ul>
              {skills.map((skill, index) => <li key={index}>{skill}</li>)}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default Example2;
