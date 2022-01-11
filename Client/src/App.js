import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

//css
import "./css/General/App.css";

//Pages
import AdminDashboard from "./Pages/Dashboards/AdminDashboard";
import UserDashboard from "./Pages/Dashboards/UserDashboard";
import Landing from "./Pages/Landing/Landing";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import OwnerDashboard from "./Pages/Dashboards/OwnerDashboard";
import Buy from "./Pages/Buy/Buy";
import History from "./Pages/History/UserHistory";

//Material UI
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import Ticket from "./Pages/Ticket/Ticket";
import Shops from "./Pages/Shops/Shops";
import Merch from "./Pages/Merch/Merch";

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
          <Route
            exact
            path="/"
            element={
              <Landing
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
            path="/login"
            element={
              <Login
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
          <Route
            exact
            path="/buy"
            element={
              <Buy
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
            path="/merch"
            element={
              <Merch
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
            path="/history"
            element={
              <History
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
            path="/ticket"
            element={
              <Ticket
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
            path="/adminShops"
            element={
              <Shops
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

          {/* Owner */}

          <Route
            exact
            path="/ownerDashboard"
            element={
              <OwnerDashboard
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
