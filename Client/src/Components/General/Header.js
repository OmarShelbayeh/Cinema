import React, { Component } from "react";

//css
import "./css/Header.css";

//Images
import Logo from "../../Images/logo_black.png";
import AuthenticationService from "../../Services/AuthenticationService";

//Material UI
import Avatar from "@mui/material/Avatar";

class Header extends Component {
  state = {
    userInfo: null,
  };

  componentDidMount() {
    this.setState({
      userInfo: AuthenticationService.getUserInfo(),
    });
  }

  render() {
    return (
      <div className="header">
        <div className="logo">
          <img
            src={Logo}
            alt="Logo"
            width="120px"
            onClick={() => {
              window.location.href = "/";
            }}
          />
        </div>
        {this.state.userInfo ? (
          this.state.userInfo.role === "ADMIN" ? (
            <div className="menu">
              <a
                className={this.props.dashboard ? "active" : ""}
                href="/adminDashboard"
              >
                Dashboard
              </a>
              <a
                className={this.props.shops ? "active" : ""}
                href="/adminShops"
              >
                Shops
              </a>
              <a
                className={this.props.settings ? "active" : ""}
                href="/settings"
              >
                Settings
              </a>
              <a
                onClick={() => {
                  AuthenticationService.logout();
                }}
              >
                Logout
              </a>
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        {this.state.userInfo ? (
          this.state.userInfo.role === "OWNER" ? (
            <div className="menu">
              <a
                className={this.props.dashboard ? "active" : ""}
                href="/ownerDashboard"
              >
                Dashboard
              </a>
              <a
                className={this.props.settings ? "active" : ""}
                href="/settings"
              >
                Settings
              </a>
              <a
                onClick={() => {
                  AuthenticationService.logout();
                }}
              >
                Logout
              </a>
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        {this.state.userInfo ? (
          this.state.userInfo.role === "USER" ? (
            <div className="menu">
              <a
                className={this.props.dashboard ? "active" : ""}
                href="/dashboard"
              >
                Dashboard
              </a>
              <a className={this.props.history ? "active" : ""} href="/history">
                History
              </a>
              <a
                className={this.props.settings ? "active" : ""}
                href="/settings"
              >
                Settings
              </a>
              <a
                onClick={() => {
                  AuthenticationService.logout();
                }}
              >
                Logout
              </a>
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}

        {this.state.userInfo ? (
          <div className="userInfo">
            <div className="icon">
              <Avatar sx={{ bgcolor: "#183b56" }}>
                {this.state.userInfo.name[0] + this.state.userInfo.surname[0]}
              </Avatar>
            </div>
            <div className="info">
              <div className="name">
                <h4>
                  {this.state.userInfo.name + " " + this.state.userInfo.surname}
                </h4>
              </div>
              <div className="role">
                <p>{this.state.userInfo.role}</p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Header;
