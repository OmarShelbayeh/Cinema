import React, { Component } from "react";

//Css
import "./css/Landing.css";

//Images
import Logo from "../../Images/logo_white.png";

class Landing extends Component {
  state = {};

  render() {
    return (
      <div className="landing">
        <div className="header"></div>
        <div className="header-2">
          <div className="picture">
            <img src={Logo} alt="Logo" width="100%" />
          </div>
          <div className="column">
            <button
              className="button"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </button>
            <button
              className="button-reverse"
              onClick={() => (window.location.href = "/register")}
            >
              SignUp
            </button>
          </div>
          <div className="buttons"></div>
        </div>
      </div>
    );
  }
}

export default Landing;
