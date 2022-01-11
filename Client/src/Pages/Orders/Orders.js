import React, { Component } from "react";
import axios from "axios";

//Services
import URL from "../../Services/URL";

//Components
import Header from "../../Components/General/Header";

//Material UI
import InventoryIcon from "@mui/icons-material/Inventory";
import DeleteForever from "@mui/icons-material/DeleteForever";

class Orders extends Component {
  state = {
    orders: [],
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

  returnOrder(id) {
    axios({
      url: URL + "/orders/cancelOrder",
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        id: id,
      },
    })
      .then((response) => {
        this.props.success(response.data);
        this.getOrders();
      })
      .catch((error) => {
        this.props.error(error.response.data);
      });
  }

  render() {
    return (
      <div>
        <Header orders />
        <div className="dashboard">
          <div className="row">
            <div className="column">
              <div className="allMovies">
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
                                  this.returnOrder(order.id);
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
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="column"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Orders;
