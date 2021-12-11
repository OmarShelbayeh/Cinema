import React, { Component } from "react";
import AuthenticationService from "../../Services/AuthenticationService";

class Register extends Component {
  state = {
    email: null,
    name: null,
    surname: null,
    password: null,
    error: false,
    errorMsg: "Something went wrong",
  };

  handleChange(change, value) {
    switch (change) {
      case "email":
        this.setState({ email: value });
        break;
      case "name":
        this.setState({ name: value });
        break;
      case "surname":
        this.setState({ surname: value });
        break;
      case "password":
        this.setState({ password: value });
        break;
      default:
        break;
    }
  }

  handleSubmit() {
    if (
      !this.state.email ||
      !this.state.name ||
      !this.state.surname ||
      !this.state.password
    ) {
      this.setState({ error: true, errorMsg: "Missing data" });
    } else {
      AuthenticationService.register(
        this.state.email,
        this.state.name,
        this.state.surname,
        this.state.password,
        () => {
          this.setState({ error: true });
        }
      );
    }
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        {this.state.error ? <h2>{this.state.errorMsg}</h2> : ""}
        <br />
        <input
          name="email"
          placeholder="Email"
          type="text"
          onChange={(event) => this.handleChange("email", event.target.value)}
        />
        <br />
        <input
          name="name"
          placeholder="name"
          type="text"
          onChange={(event) => this.handleChange("name", event.target.value)}
        />
        <br />
        <input
          name="surname"
          placeholder="surname"
          type="text"
          onChange={(event) => this.handleChange("surname", event.target.value)}
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
        <button onClick={() => this.handleSubmit()}>Register</button>
      </div>
    );
  }
}

export default Register;
