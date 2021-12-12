import React, { Component } from "react";

//Css
import "./css/Landing.css";

class Landing extends Component {
  state = {};

  render() {
    return (
      <div className="landing">
        <div className="header">
          <div className="title">
            <h1>Cinema SQL</h1>
          </div>
          <div className="buttons">
            <button onClick={() => (window.location.href = "/login")}>
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
