import React, { Component } from "react";

//Services
import AuthenticationService from "../../Services/AuthenticationService";

//Components
import AllMovies from "../../Components/Movies/AllMovies";

class AdminDashboard extends Component {
  render() {
    if (!AuthenticationService.isUserLoggedIn()) {
      window.location.href = "/login";
    }
    if (AuthenticationService.getRole() !== "ADMIN") {
      window.location.href = "/dashboard";
    }
    return (
      <div>
        <AllMovies />
      </div>
    );
  }
}

export default AdminDashboard;
