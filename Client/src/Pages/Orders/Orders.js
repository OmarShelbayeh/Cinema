import React, { Component } from "react";
import axios from "axios";

//Services
import URL from "../../Services/URL";
import AuthenticationService from "../../Services/AuthenticationService";

//Components
import Header from "../../Components/General/Header";

//Material UI
import InventoryIcon from "@mui/icons-material/Inventory";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { Backdrop, Fade, Modal } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

class Orders extends Component {
  state = {
    orders: [],
    deleteOrderId: null,
    openConfirmation: false,
  };

  componentDidMount() {
    this.getOrders();
  }

  getOrders() {
    axios({
      url: URL + "/orders/allOrders",
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }).then((response) => {
      this.setState({ orders: response.data });
    });
  }

  returnOrder() {
    axios({
      url: URL + "/orders/cancelOrder",
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        id: this.state.deleteOrderId,
      },
    })
      .then((response) => {
        this.props.success(response.data);
        this.setState({ openConfirmation: false, deleteOrderId: null });
        this.getOrders();
      })
      .catch((error) => {
        this.props.error(error.response.data);
      });
  }

  render() {
    return (
      <div className="allMovies" style={{ marginTop: "24px" }}>
        <div className="table-container">
          <div className="title">
            <InventoryIcon />
            <div className="text">My Orders</div>
          </div>
          {this.state.orders.length > 0 ? (
            <div className="table">
              <table>
                <tr>
                  <th>Movie Name</th>
                  <th>Product Name</th>
                  <th style={{ textAlign: "center" }}>Amount</th>
                  <th style={{ textAlign: "center" }}>Return</th>
                </tr>
                {this.state.orders.map((order) => (
                  <tr>
                    <td>{order.movie}</td>
                    <td>{order.product}</td>
                    <td style={{ textAlign: "center" }}>{order.num}</td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        onClick={() => {
                          this.setState({
                            deleteOrderId: order.id,
                            openConfirmation: true,
                          });
                        }}
                      >
                        <DeleteForever style={{ fill: "#f37757" }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          ) : (
            <div className="table" style={{ textAlign: "center" }}>
              You will see all your active orders here
            </div>
          )}
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.openConfirmation}
          onClose={() =>
            this.setState({
              openConfirmation: false,
            })
          }
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.openConfirmation}>
            <div className="merch-popup">
              <div className="close-popup-button">
                <p className="titles-text">
                  Are you sure you want to cancel this order?
                </p>
                <button
                  type="button"
                  onClick={() =>
                    this.setState({
                      openConfirmation: false,
                    })
                  }
                >
                  <CancelIcon style={{ fill: "#f37757" }} />
                </button>
              </div>
              <div className="merch-popup-body">
                <p>
                  You can only cancel your order if it didn't leave the
                  warehouse yet.
                </p>
              </div>
              <div className="newMovie">
                <button
                  className="button"
                  onClick={() => {
                    this.returnOrder();
                  }}
                >
                  Cancel Order
                </button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default Orders;
