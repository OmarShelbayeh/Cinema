import React, { Component } from "react";
import axios from "axios";

//css
import "./Css/dashboard.css";

//Services
import AuthenticationService from "../../Services/AuthenticationService";
import URL from "../../Services/URL";

//Components
import AllMovies from "../../Components/Movies/AllMovies";
import Header from "../../Components/General/Header";
import Stages from "../../Components/Stages/Stages";
import Schedules from "../../Components/Schedules/Schedules";
import AddAdmin from "../../Components/AddAdmin/AddAdmin";

class OwnerDashboard extends Component {
  state = {
    allMovies: [],
    allStages: [],
  };

  render() {
    if (!AuthenticationService.isUserLoggedIn()) {
      window.location.href = "/login";
    }
    if (AuthenticationService.getRole() !== "OWNER") {
      window.location.href = "/dashboard";
    }
    return (
      <div>
        <Header dashboard />
        <div className="dashboard">
          <div className="row">
            <div className="column">
              <AddAdmin
                error={(msg) => this.props.error(msg)}
                warning={(msg) => this.props.warning(msg)}
                success={(msg) => this.props.success(msg)}
              />
            </div>
            <div className="column"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default OwnerDashboard;
