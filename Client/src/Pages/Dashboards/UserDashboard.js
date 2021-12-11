import React, { Component } from "react";
import AuthenticationService from "../../Services/AuthenticationService";

class UserDashboard extends Component {
  render() {
    if (!AuthenticationService.isUserLoggedIn()) {
      window.location.href = "/login";
    }
    if (AuthenticationService.getRole() === "ADMIN") {
      window.location.href = "/adminDashboard";
    }
    return <div></div>;
  }
}

export default UserDashboard;
