// src/FavoriteColor.js
import React, { Component } from "react";

class FavoriteColor extends Component {
  state = { favoriteColor: "red" };

  changeColor = () => {
    this.setState({ favoriteColor: "blue" });
  };

  shouldComponentUpdate() {
    return true; // Set to false to block updates
  }

  render() {
    return (
      <div>
        <h3>Favorite Color: {this.state.favoriteColor}</h3>
        <button onClick={this.changeColor}>Change Color</button>
      </div>
    );
  }
}

export default FavoriteColor;
