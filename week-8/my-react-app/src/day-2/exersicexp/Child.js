// src/Child.js
import React, { Component } from "react";

class Child extends Component {
  componentWillUnmount() {
    alert("Child unmounted!");
  }

  render() {
    return <h3>Hello World!</h3>;
  }
}

export default Child;
