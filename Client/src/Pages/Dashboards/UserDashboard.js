import React, { Component } from "react";
import Header from "../../Components/General/Header";
import CurrentTickets from "../../Components/History/CurrentTickets";
import UserSchedules from "../../Components/Schedules/UserSchedules";
import AuthenticationService from "../../Services/AuthenticationService";
import Orders from "../Orders/Orders";

class UserDashboard extends Component {
  state = {
    allSchedules: [],
  };

  render() {
    if (!AuthenticationService.isUserLoggedIn()) {
      window.location.href = "/login";
    }
    if (AuthenticationService.getRole() === "ADMIN") {
      window.location.href = "/adminDashboard";
    }
    if (AuthenticationService.getRole() === "OWNER") {
      window.location.href = "/ownerDashboard";
    }
    return (
      <div>
        <Header dashboard />
        <div className="dashboard">
          <div className="row">
            <div className="column">
              <UserSchedules
                error={(msg) => this.props.error(msg)}
                warning={(msg) => this.props.warning(msg)}
                success={(msg) => this.props.success(msg)}
              />
            </div>
            <div className="column">
              <CurrentTickets
                error={(msg) => this.props.error(msg)}
                warning={(msg) => this.props.warning(msg)}
                success={(msg) => this.props.success(msg)}
              />
              <Orders
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

export default UserDashboard;
