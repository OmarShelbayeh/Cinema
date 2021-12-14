import React, { Component } from "react";

//css
import "./Css/dashboard.css";

//Services
import AuthenticationService from "../../Services/AuthenticationService";

//Components
import AllMovies from "../../Components/Movies/AllMovies";
import Header from "../../Components/General/Header";
import Stages from "../Stages/Stages";

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
        <Header dashboard />
        <div className="dashboard">
          <div className="row">
            <div className="column">
              <AllMovies
                error={(msg) => this.props.error(msg)}
                warning={(msg) => this.props.warning(msg)}
                success={(msg) => this.props.success(msg)}
              />
            </div>
            <div className="column">
              <Stages
                error={(msg) => this.props.error(msg)}
                warning={(msg) => this.props.warning(msg)}
                success={(msg) => this.props.success(msg)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
