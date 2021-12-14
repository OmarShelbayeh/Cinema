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
        <AllMovies
          error={(msg) => this.props.error(msg)}
          warning={(msg) => this.props.warning(msg)}
          success={(msg) => this.props.success(msg)}
        />
      </div>
    );
  }
}

export default AdminDashboard;
