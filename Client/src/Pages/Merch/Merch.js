import React, { Component } from "react";
import axios from "axios";

//Services
import URL from "../../Services/URL";
import AuthenticationService from "../../Services/AuthenticationService";

//Css
import "./css/Merch.css";

//Material UI
import { TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CancelIcon from "@mui/icons-material/Cancel";

class Merch extends Component {
  state = {
    ticket_id: null,
    products: [],
    chosen: {
      id: null,
      pcs: 1,
    },
    product: {
      name: "",
      price: 0,
      pcs: 0,
    },
    error: false,
    openBuy: false,
  };

  componentDidMount() {
    this.getParams();
  }

  handleClose() {
    this.setState({
      chosen: {
        id: null,
        pcs: 1,
      },
      openBuy: false,
    });
  }

  getParams = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const ticket_id = queryParams.get("ticket_id");
    const movie = queryParams.get("movie");
    await this.setState({
      ticket_id: ticket_id,
      movie: movie,
    });
    this.getProducts(ticket_id);
  };

  getProducts(id) {
    axios({
      url: URL + "/products/movieProducts",
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        ticket_id: id,
      },
    })
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        this.props.error(error.response.data);
      });
  }

  buyProduct() {
    if (
      this.state.chosen.id !== this.state.product.id &&
      this.state.chosen.id
    ) {
      this.props.error("You need to choose product first");
    } else {
      axios({
        url: URL + "/orders/newOrder",
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
        },
        data: {
          product_id: this.state.product.id,
          number_of_pieces: this.state.chosen.pcs,
        },
      })
        .then((response) => {
          this.getProducts(this.state.ticket_id);
          this.props.success(response.data);
          this.handleClose();
        })
        .then(() => {
          window.location.href = "/dashboard";
        })
        .catch((error) => {
          this.props.error(error.response.data);
        });
    }
  }

  handleChange(id, value, pcs) {
    if (pcs >= value && value > 0) {
      this.setState({
        error: false,
        chosen: {
          id: id,
          pcs: value,
        },
      });
    } else {
      this.setState({ error: true });
    }
  }

  render() {
    if (!AuthenticationService.isUserLoggedIn()) {
      window.location.href = "/login";
    }
    if (AuthenticationService.getRole() !== "USER") {
      window.location.href = "/dashboard";
    }
    return (
      <div className="merch">
        <div className="title">{this.state.movie}</div>
        {this.state.products.length > 0 ? (
          this.state.products.map((product) => (
            <div className="item">
              <div className="name">{product.name}</div>
              <div className="price">{`\$${product.price} /piece`}</div>
              <div className="available TextField-radius">
                <TextField
                  error={this.state.error}
                  variant="outlined"
                  type="number"
                  label="Amount"
                  value={this.state.chosen.pcs}
                  fullWidth
                  onChange={(e) => {
                    this.handleChange(
                      product.id,
                      e.target.value,
                      product.available_pcs
                    );
                  }}
                />
              </div>
              <div className="available">
                {`Available: ${product.available_pcs} pieces`}
              </div>
              <button
                onClick={() =>
                  this.setState({ openBuy: true, product: product })
                }
              >
                Buy
              </button>
            </div>
          ))
        ) : (
          <div className="item">
            <div className="name">No Merch Available</div>
          </div>
        )}
        <Modal
          open={this.state.openBuy}
          onClose={() => this.handleClose()}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.openBuy}>
            <div className="merch-popup">
              <div className="close-popup-button">
                <p className="titles-text">
                  Are you sure you want to buy this product ?
                </p>
                <button type="button" onClick={() => this.handleClose()}>
                  <CancelIcon style={{ fill: "#f37757" }} />
                </button>
              </div>
              <div className="merch-popup-body">
                <table>
                  <tr>
                    <th>Name</th>
                    <th>Total Price</th>
                    <th>Amount</th>
                  </tr>
                  <tr>
                    <td>{this.state.product.name}</td>
                    <td>{this.state.chosen.pcs * this.state.product.price}</td>
                    <td>{this.state.chosen.pcs}</td>
                  </tr>
                </table>
              </div>
              <div className="newMovie">
                <button
                  className="button"
                  onClick={() => {
                    this.buyProduct();
                  }}
                >
                  Buy
                </button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default Merch;
