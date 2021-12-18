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

  getAllMovies() {
    axios({
      url: URL + "/movies/allMovies",
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }).then((response) => {
      this.setState({ allMovies: response.data });
    });
  }

  getAllStages() {
    axios({
      url: URL + "/stages/allStages",
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
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
                getAllMovies={() => this.getAllMovies()}
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
                getAllStages={() => this.getAllStages()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
