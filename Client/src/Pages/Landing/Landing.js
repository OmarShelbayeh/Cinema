import React, { Component } from "react";

class Landing extends Component {
  state = {};

  render() {
    return (
      <div>
        <h1>Cinema SQL</h1>
        <br />
        <button onClick={() => (window.location.href = "/login")}>Login</button>
      </div>
    );
  }
}

export default Landing;
