import axios from "axios";
import React, { Component } from "react";

//Services
import URL from "../../Services/URL";
import AuthenticationService from "../../Services/AuthenticationService";

//Material UI
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

class Deliveries extends Component {
  state = {
    allDeliveries: [],
  };

  componentDidMount() {
    this.getDeliveries();
  }

  getDeliveries(order) {
    axios({
      url: URL + "/delivery/allDeliveries",
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        order: order,
      },
    }).then((response) => {
      this.setState({ allDeliveries: response.data });
    });
    if (order) {
      this.setState({ active: order });
    } else {
      this.setState({ active: "name" });
    }
  }

  render() {
    return (
      <div className="allMovies">
        <div className="table-container">
          <div className="title">
            <LocalShippingIcon />
            <div className="text">Deliveries</div>
          </div>
          <div className="table">
            <table>
              <tr>
                <th>
                  <a
                    onClick={() => {
                      this.getDeliveries();
                    }}
                    className={this.state.active === "name" ? "active" : ""}
                  >
                    Name +
                  </a>
                </th>
                <th>
                  <a
                    onClick={() => {
                      this.getDeliveries("surname");
                    }}
                    className={this.state.active === "surname" ? "active" : ""}
                  >
                    Surname +
                  </a>
                </th>
                <th>
                  <a
                    onClick={() => {
                      this.getDeliveries("email");
                    }}
                    className={this.state.active === "email" ? "active" : ""}
                  >
                    Email +
                  </a>
                </th>
                <th style={{ textAlign: "center" }}>
                  <a
                    onClick={() => {
                      this.getDeliveries("productName");
                    }}
                    className={
                      this.state.active === "productName" ? "active" : ""
                    }
                  >
                    Product Name +
                  </a>
                </th>
                <th style={{ textAlign: "center" }}>
                  <a
                    onClick={() => {
                      this.getDeliveries("numberOfPcs");
                    }}
                    className={
                      this.state.active === "numberOfPcs" ? "active" : ""
                    }
                  >
                    Number Of Pieces +
                  </a>
                </th>
                <th style={{ textAlign: "center" }}>
                  <a
                    onClick={() => {
                      this.getDeliveries("movieName");
                    }}
                    className={
                      this.state.active === "movieName" ? "active" : ""
                    }
                  >
                    Movie Name +
                  </a>
                </th>
              </tr>
              {this.state.allDeliveries.length > 0
                ? this.state.allDeliveries.map((delivery) => (
                    <tr>
                      <td>{delivery.user_name}</td>
                      <td>{delivery.user_surname}</td>
                      <td>{delivery.user_email}</td>
                      <td style={{ textAlign: "center" }}>
                        {delivery.product_name}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {delivery.num_of_pcs}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {delivery.movie_name}
                      </td>
                    </tr>
                  ))
                : ""}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Deliveries;
