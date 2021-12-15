import React, { Component } from "react";
import axios from "axios";

//css
import "./css/Login.css";

//images
import Logo from "../../Images/logo_black.png";

//Services
import AuthenticationService from "../../Services/AuthenticationService";
import URL from "../../Services/URL";

//Material UI
import TextField from "@mui/material/TextField";

class Login extends Component {
  state = {
    email: null,
    password: null,
    error: false,
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

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.email && this.state.password) {
      axios({
        url: URL + "/login",
        method: "POST",
        data: {
          email: this.state.email,
          password: this.state.password,
        },
      })
        .then((response) => {
          AuthenticationService.registerSuccessfulLogin(response.data.token);
        })
        .then(() => {
          AuthenticationService.afterLogin();
        })
        .catch((error) => {
          this.props.error(
            error.response.data.message
              ? error.response.data.message
              : error.response.data.msg
          );
        });
    } else {
      this.props.warning("Missing Data");
    }
  }

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="title">
            <div className="text">Login</div>
          </div>
          <div className="row">
            <div className="column">
              <form>
                <div className="element TextField-radius">
                  <TextField
                    required
                    type="text"
                    label="Email"
                    onChange={(event) =>
                      this.handleChange("email", event.target.value)
                    }
                    fullWidth
                  />
                </div>
                <div className="element TextField-radius">
                  <TextField
                    required
                    error={this.state.error}
                    label="Password"
                    type="password"
                    onChange={(event) =>
                      this.handleChange("password", event.target.value)
                    }
                    fullWidth
                    helperText={this.state.errorMsg}
                  />
                </div>
                <button
                  type="submit"
                  className="button"
                  onClickCapture={(event) => this.handleSubmit(event)}
                >
                  Login
                </button>
              </form>

              <button
                className="button-reverse"
                onClick={() => (window.location.href = "/register")}
              >
                Register
              </button>
            </div>
            <div className="column">
              <img src={Logo} alt="Logo" width="90%" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
