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

class AdminDashboard extends Component {
  state = {
    allMovies: [],
    allStages: [],
  };

  getAllMovies(order) {
    axios({
      url: URL + "/movies/allMovies",
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        order: order,
      },
    }).then((response) => {
      this.setState({ allMovies: response.data });
    });
  }

  getAllStages(order) {
    axios({
      url: URL + "/stages/allStages",
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        order: order,
      },
    }).then((response) => {
      this.setState({ allStages: response.data });
    });
  }

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
                allMovies={this.state.allMovies}
                getAllMovies={(order) => this.getAllMovies(order)}
              />
              <Schedules
                error={(msg) => this.props.error(msg)}
                warning={(msg) => this.props.warning(msg)}
                success={(msg) => this.props.success(msg)}
                allMovies={this.state.allMovies}
                allStages={this.state.allStages}
              />
            </div>
            <div className="column">
              <Stages
                error={(msg) => this.props.error(msg)}
                warning={(msg) => this.props.warning(msg)}
                success={(msg) => this.props.success(msg)}
                allStages={this.state.allStages}
                getAllStages={(order) => this.getAllStages(order)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
