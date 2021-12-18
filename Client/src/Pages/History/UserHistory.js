import React, { Component } from "react";
import Header from "../../Components/General/Header";
import AuthenticationService from "../../Services/AuthenticationService";
import UserHistoryComponent from "../../Components/History/UserHistory";
import CurrentTickets from "../../Components/History/CurrentTickets";

class UserHistory extends Component {
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
        <Header history />
        <div className="dashboard">
          <div className="row">
            <div className="column">
              <UserHistoryComponent
                error={(msg) => this.props.error(msg)}
                warning={(msg) => this.props.warning(msg)}
                success={(msg) => this.props.success(msg)}
              />
            </div>
            <div className="column">

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserHistory;
