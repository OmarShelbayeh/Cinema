import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

import "./css/General/App.css";

import AdminDashboard from "./Pages/Dashboards/AdminDashboard";
import UserDashboard from "./Pages/Dashboards/UserDashboard";
import Landing from "./Pages/Landing/Landing";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Stages from "./Pages/Stages/Stages";

//Material UI
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

class App extends Component {
  state = {
    error: false,
    success: false,
    warning: false,
    errorMsg: "",
    successMsg: "",
    warningMsg: "",
  };

  success = (msg) => {
    this.setState({ success: true, successMsg: msg });
  };

  error = (msg) => {
    this.setState({ error: true, errorMsg: msg });
  };

  warning = (msg) => {
    this.setState({ warning: true, warningMsg: msg });
  };

  render() {
    return (
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/register"
            element={
              <Register
                success={(msg) => {
                  this.success(msg);
                }}
                error={(msg) => {
                  this.error(msg);
                }}
                warning={(msg) => {
                  this.warning(msg);
                }}
              />
            }
          />

          {/* User */}
          <Route
            exact
            path="/dashboard"
            element={
              <UserDashboard
                success={(msg) => {
                  this.success(msg);
                }}
                error={(msg) => {
                  this.error(msg);
                }}
                warning={(msg) => {
                  this.warning(msg);
                }}
              />
            }
          />

          {/* Admin */}
          <Route
            exact
            path="/adminDashboard"
            element={
              <AdminDashboard
                success={(msg) => {
                  this.success(msg);
                }}
                error={(msg) => {
                  this.error(msg);
                }}
                warning={(msg) => {
                  this.warning(msg);
                }}
              />
            }
          />
          <Route
            exact
            path="/stages"
            element={
              <Stages
                success={(msg) => {
                  this.success(msg);
                }}
                error={(msg) => {
                  this.error(msg);
                }}
                warning={(msg) => {
                  this.warning(msg);
                }}
              />
            }
          />
        </Routes>
        <Snackbar
          open={this.state.error}
          autoHideDuration={6000}
          onClose={() => this.setState({ error: false })}
        >
          <Alert
            onClose={() => this.setState({ error: false })}
            severity="error"
            sx={{ width: "100%" }}
          >
            {this.state.errorMsg}
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.success}
          autoHideDuration={6000}
          onClose={() => this.setState({ success: false })}
        >
          <Alert
            onClose={() => this.setState({ success: false })}
            severity="success"
            sx={{ width: "100%" }}
          >
            {this.state.successMsg}
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.warning}
          autoHideDuration={6000}
          onClose={() => this.setState({ warning: false })}
        >
          <Alert
            onClose={() => this.setState({ warning: false })}
            severity="warning"
            sx={{ width: "100%" }}
          >
            {this.state.warningMsg}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default App;
