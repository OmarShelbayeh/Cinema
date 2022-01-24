import React, { Component } from "react";
import axios from "axios";

//Css
import "./css/Settings.css";

//Services
import AuthenticationService from "../../Services/AuthenticationService";
import URL from "../../Services/URL";

//Components
import Header from "../../Components/General/Header";

//Material UI
import { Avatar } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

class Settings extends Component {
  state = {
    openChangePassword: false,
    errorMsg: "Passwords don't match",
    errorpsw: false,
    showPasswordOld: false,
    showPasswordOld: false,

    oldPassword: null,
    password: null,
    passwordrpt: null,
  };

  handleChange(change, value) {
    switch (change) {
      case "oldPassword":
        this.setState({ oldPassword: value });
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

  changePassword() {
    if (
      !this.state.oldPassword ||
      !this.state.password ||
      !this.state.passwordrpt
    ) {
      this.props.warning("Missing Data");
    } else {
      if (!this.state.errorpsw) {
        axios({
          url: URL + "/user/changePassword",
          headers: {
            authorization: localStorage.getItem("token"),
          },
          method: "POST",
          data: {
            oldPassword: this.state.oldPassword,
            password: this.state.password,
            passwordrpt: this.state.passwordrpt,
          },
        })
          .then((response) => {
            this.props.success(response.data);
            this.setState({
              openChangePassword: false,
              oldPassword: "",
              password: "",
              passwordrpt: "",
            });
          })
          .then(() => {
            AuthenticationService.logout();
          })
          .catch((error) =>
            this.props.error(
              error.response.data ? error.response.data : "Something went wrong"
            )
          );
      }
    }
  }

  render() {
    return (
      <div>
        <Header settings />
        <div className="settings">
          <div className="row">
            <div className="container">
              <Avatar
                style={{
                  backgroundColor: "#183b56",
                  width: "15vh",
                  height: "15vh",
                  fontSize: "300%",
                }}
              >
                {AuthenticationService.getUserInfo().name[0]}
              </Avatar>
              <br />
              <br />
              <h2>
                {`${AuthenticationService.getUserInfo().name} ${
                  AuthenticationService.getUserInfo().surname
                }`}
              </h2>
              <br />
              <h4>{`${AuthenticationService.getUserInfo().email}`}</h4>

              <h4>{`${AuthenticationService.getUserInfo().role}`}</h4>
              <br />
              <br />

              <button
                className="button"
                onClick={() => {
                  this.setState({ openChangePassword: true });
                }}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.openChangePassword}
          onClose={() => this.setState({ openChangePassword: false })}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.openChangePassword}>
            <div className="merch-popup">
              <div className="close-popup-button">
                <p className="titles-text">Change password</p>
                <button
                  type="button"
                  onClick={() =>
                    this.setState({
                      openChangePassword: false,
                    })
                  }
                >
                  <CancelIcon style={{ fill: "#f37757" }} />
                </button>
              </div>
              <div className="merch-popup-body TextField-radius">
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel
                    style={{ fontFamily: '"Rubik", sans-serif' }}
                    htmlFor="outlined-adornment-password"
                  >
                    Old Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={this.state.showPasswordOld ? "text" : "password"}
                    helperText={this.state.errorMsg}
                    onChange={(event) =>
                      this.handleChange("oldPassword", event.target.value)
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            this.setState({
                              showPasswordOld: !this.state.showPasswordOld,
                            })
                          }
                          edge="end"
                        >
                          {this.state.showPasswordOld ? (
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
              <div className="merch-popup-body TextField-radius">
                <FormControl
                  error={
                    this.state.errorpsw ? this.state.errorpsw : this.state.error
                  }
                  fullWidth
                  variant="outlined"
                  required
                >
                  <InputLabel
                    style={{ fontFamily: '"Rubik", sans-serif' }}
                    htmlFor="outlined-adornment-password"
                  >
                    New Password
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
              <div className="merch-popup-body TextField-radius">
                <FormControl
                  error={
                    this.state.errorpsw ? this.state.errorpsw : this.state.error
                  }
                  fullWidth
                  variant="outlined"
                  required
                >
                  <InputLabel
                    style={{ fontFamily: '"Rubik", sans-serif' }}
                    htmlFor="outlined-adornment-password"
                  >
                    Repeat New Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={this.state.showPassword ? "text" : "password"}
                    helperText={this.state.errorMsg}
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
                    label="Password"
                  />
                </FormControl>
              </div>
              <div className="merch-popup-body">
                <p style={{ color: "red" }}>
                  {this.state.errorpsw ? this.state.errorMsg : ""}
                </p>
              </div>
              <div className="newMovie">
                <button
                  className="button"
                  onClick={() => {
                    this.changePassword();
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default Settings;
