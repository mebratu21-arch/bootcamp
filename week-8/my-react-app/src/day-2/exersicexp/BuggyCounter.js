// src/BuggyCounter.js
import React, { Component } from "react";

class BuggyCounter extends Component {
  state = { counter: 0 };

  handleClick = () => {
    this.setState({ counter: this.state.counter + 1 });
    if (this.state.counter + 1 === 5) {
      throw new Error("I crashed!");
    }
  };

  render() {
    return (
      <h3
        onClick={this.handleClick}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        {this.state.counter}
      </h3>
    );
  }
}

export default BuggyCounter;
