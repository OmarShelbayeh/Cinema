import React, { Component } from "react";
import AuthenticationService from "../../Services/AuthenticationService";

class Login extends Component {
  state = {
    email: null,
    password: null,
  };

  handleChange(change, value) {
    switch (change) {
      case "email":
        this.setState({ email: value });
        break;
      case "password":
        this.setState({ password: value });
        break;
      default:
        break;
    }
  }

  handleSubmit() {
    AuthenticationService.registerSuccessfulLogin(
      this.state.email,
      this.state.password
    );
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <br />
        <input
          name="email"
          placeholder="Email"
          type="text"
          onChange={(event) => this.handleChange("email", event.target.value)}
        />
        <br />
        <input
          name="password"
          placeholder="password"
          type="password"
          onChange={(event) =>
            this.handleChange("password", event.target.value)
          }
        />
        <br />
        <button onClick={() => this.handleSubmit()}>Login</button>
      </div>
    );
  }
}

export default Login;
