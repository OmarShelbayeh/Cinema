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
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

class Login extends Component {
  state = {
    email: null,
    password: null,
    error: false,

    showPassword: false,
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
                  <FormControl
                    error={this.state.error}
                    fullWidth
                    variant="outlined"
                    required
                  >
                    <InputLabel
                      style={{ fontFamily: '"Rubik", sans-serif' }}
                      htmlFor="outlined-adornment-password"
                    >
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={this.state.showPassword ? "text" : "password"}
                      helperText={this.state.errorMsg}
                      onChange={(event) =>
                        this.handleChange("password", event.target.value)
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              this.setState({
                                showPassword: !this.state.showPassword,
                              })
                            }
                            edge="end"
                          >
                            {this.state.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
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
