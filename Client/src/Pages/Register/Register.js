import React, { Component } from "react";

//Images
import Logo from "../../Images/logo_black.png";

//Services
import AuthenticationService from "../../Services/AuthenticationService";

//Material UI
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

class Register extends Component {
  state = {
    email: null,
    name: null,
    surname: null,
    password: null,
    passwordrpt: null,

    errorpsw: false,
    error: false,
    errorMsg: "",
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
      case "passwordrpt":
        if (this.state.password !== value) {
          this.setState({ errorpsw: true });
        } else {
          this.setState({ errorpsw: false });
        }
        this.setState({ passwordrpt: value });
        break;
      default:
        break;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (
      !this.state.email ||
      !this.state.name ||
      !this.state.surname ||
      !this.state.password
    ) {
      this.setState({ error: true, errorMsg: "Missing data" });
      this.props.warning("Missing Data");
    } else {
      if (!this.state.errorpsw) {
        AuthenticationService.register(
          this.state.email,
          this.state.name,
          this.state.surname,
          this.state.password,
          () => {
            this.setState({ error: true });
            this.props.error("Oops! Something went wrong");
          }
        );
      }
    }
  }

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="title">
            <div className="text">Register</div>
          </div>
          <div className="row">
            <div className="column">
              <form>
                <div className="element TextField-radius">
                  <TextField
                    required
                    error={this.state.error}
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
                    label="Name"
                    type="text"
                    onChange={(event) =>
                      this.handleChange("name", event.target.value)
                    }
                    fullWidth
                  />
                </div>
                <div className="element TextField-radius">
                  <TextField
                    required
                    error={this.state.error}
                    type="text"
                    label="Surname"
                    onChange={(event) =>
                      this.handleChange("surname", event.target.value)
                    }
                    fullWidth
                  />
                </div>
                <div className="element TextField-radius">
                  <FormControl
                    error={
                      this.state.errorpsw
                        ? this.state.errorpsw
                        : this.state.error
                    }
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
                <div className="element TextField-radius">
                  <FormControl
                    error={
                      this.state.errorpsw
                        ? this.state.errorpsw
                        : this.state.error
                    }
                    fullWidth
                    variant="outlined"
                    required
                  >
                    <InputLabel
                      style={{ fontFamily: '"Rubik", sans-serif' }}
                      htmlFor="outlined-adornment-password"
                    >
                      Repeat Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={this.state.showPassword ? "text" : "password"}
                      helperText={
                        this.state.errorpsw ? "Passwords don't match" : ""
                      }
                      onChange={(event) =>
                        this.handleChange("passwordrpt", event.target.value)
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
                      label="Repeat Password"
                    />
                  </FormControl>
                  {this.state.errorpsw ? "Passwords don't match" : ""}
                </div>

                <button
                  type="submit"
                  className="button"
                  onClickCapture={(event) => this.handleSubmit(event)}
                >
                  Register
                </button>
              </form>

              <button
                className="button-reverse"
                onClick={() => (window.location.href = "/login")}
              >
                Login
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

export default Register;
