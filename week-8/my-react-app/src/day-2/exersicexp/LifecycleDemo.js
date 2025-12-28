// src/LifecycleDemo.js
import React, { Component } from "react";

class LifecycleDemo extends Component {
  state = { favoriteColor: "red" };

  componentDidMount() {
    setTimeout(() => this.setState({ favoriteColor: "yellow" }), 2000);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("in getSnapshotBeforeUpdate", prevState.favoriteColor);
    return null;
  }

  componentDidUpdate() {
    console.log("after update", this.state.favoriteColor);
  }

  render() {
    return <h3>Lifecycle Color: {this.state.favoriteColor}</h3>;
  }
}

export default LifecycleDemo;
