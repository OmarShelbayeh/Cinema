import React, { Component } from "react";
import axios from "axios";

//COmponents
import Header from "../../Components/General/Header";

//Services
import URL from "../../Services/URL";
import AuthenticationService from "../../Services/AuthenticationService";

//Material UI
import StorefrontIcon from "@mui/icons-material/Storefront";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteForever from "@mui/icons-material/DeleteForever";

class Shops extends Component {
  state = {
    allMovies: [],
    shop: null,
    newShop: false,
    shopName: "",
    movie_id: null,
    openNewShop: false,
    storage_id: 0,
    openNewProduct: false,
    newProduct: {
      name: null,
      available_pcs: null,
      price: null,
    },

    openConfirmation: false,
    deleteId: null,
  };

  componentDidMount() {
    this.getAllMovies();
  }

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

  getShop(id, name) {
    axios({
      url: URL + "/shops/getShop",
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        id: id,
      },
    })
      .then(async (response) => {
        await this.setState({
          shop: response.data,
          newShop: false,
          shopName: name,
        });
        await this.getAllProducts(id);
      })
      .catch((error) => {
        if (error.response.data === "Shop not found") {
          this.setState({ newShop: true, shopName: name, movie_id: id });
        }
        this.props.warning(error.response.data);
      });
  }

  getAllStorage() {
    axios({
      url: URL + "/storage/getAll",
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        this.setState({
          storage: response.data,
        });
      })
      .catch((error) => {
        this.props.error(error.response.data);
      });
  }

  addNewShop() {
    axios({
      url: URL + "/shops/newShop",
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        movie_id: this.state.movie_id,
        storage_id: this.state.storage_id,
      },
    })
      .then(async (response) => {
        this.props.success(response.data);
        await this.setState({
          openNewShop: false,
          newShop: false,
          shop: null,
          storage: null,
          storage_id: 0,
        });
        await this.getShop(this.state.movie_id);
      })
      .catch((error) => {
        this.props.error(error.response.data);
      });
  }

  getAllProducts(id) {
    axios({
      url: URL + "/products/allProducts",
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        id: id,
      },
    })
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        this.props.error(error.response.data);
      });
  }

  addNewProduct() {
    axios({
      url: URL + "/products/newProduct",
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        name: this.state.newProduct.name,
        available_pcs: this.state.newProduct.available_pcs,
        shop_id: this.state.shop.id,
        price: this.state.newProduct.price,
      },
    })
      .then((response) => {
        this.props.success(response.data);
        this.setState({
          openNewProduct: false,
          newProduct: {
            name: null,
            available_pcs: null,
            price: null,
          },
        });
      })
      .then(() => {
        this.getAllProducts(this.state.shop.movie_id);
      })
      .catch((error) => {
        this.props.error(error.response.data);
      });
  }

  deleteProduct() {
    axios({
      url: URL + "/products/deleteProduct",
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        product_id: this.state.deleteId,
      },
    })
      .then((response) => {
        this.props.success(response.data);
      })
      .then(() => {
        this.getAllProducts(this.state.shop.movie_id);
        this.setState({ openConfirmation: false, deleteId: null });
      })
      .catch((error) => {
        this.props.error(error.response.data);
      });
  }

  handleChange(value) {
    this.setState({ storage_id: value });
  }

  handleChangeProduct(change, value) {
    switch (change) {
      case "name":
        this.setState({
          newProduct: {
            name: value,
            available_pcs: this.state.newProduct.available_pcs,
            price: this.state.newProduct.price,
          },
        });
        break;
      case "available":
        this.setState({
          newProduct: {
            name: this.state.newProduct.name,
            available_pcs: value,
            price: this.state.newProduct.price,
          },
        });
        break;
      case "price":
        this.setState({
          newProduct: {
            name: this.state.newProduct.name,
            available_pcs: this.state.newProduct.available_pcs,
            price: value,
          },
        });
        break;
      default:
        break;
    }
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
        <Header shops />
        <div className="dashboard">
          <div className="row">
            <div className="column">
              <div className="allMovies">
                <div className="table-container">
                  <div className="title">
                    <LocalMoviesIcon />
                    <div className="text">All movies</div>
                  </div>
                  <div className="table">
                    <table>
                      <tr>
                        <th>Movie Name</th>
                        <th style={{ textAlign: "center" }}>Director</th>
                        <th style={{ textAlign: "center" }}>Owner</th>
                        <th style={{ textAlign: "center" }}>Open Shop</th>
                      </tr>
                      {this.state.allMovies.map((movie) => (
                        <tr>
                          <td>{movie.name}</td>
                          <td style={{ textAlign: "center" }}>
                            {movie.director}
                          </td>
                          <td style={{ textAlign: "center" }}>{movie.owner}</td>
                          <td style={{ textAlign: "center" }}>
                            <button
                              onClick={() => {
                                this.getShop(movie.id, movie.name);
                              }}
                            >
                              <OpenInNewIcon />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="allMovies">
                {this.state.newShop ? (
                  <div className="table-container">
                    <div className="title">
                      <StorefrontIcon />
                      <div className="text">
                        {this.state.shopName + " Shop"}
                      </div>
                    </div>
                    <h3 style={{ marginTop: "24px" }}>
                      Shop doesn't exist, you should open a new shop
                    </h3>
                    <button
                      className="button"
                      onClick={async () => {
                        await this.getAllStorage();
                        await this.setState({ openNewShop: true });
                      }}
                    >
                      Add new shop
                    </button>
                  </div>
                ) : (
                  ""
                )}
                {this.state.shop ? (
                  this.state.products ? (
                    <div className="table-container">
                      <div className="title">
                        <StorefrontIcon />
                        <div className="text">
                          {this.state.shopName + " Shop"}
                        </div>
                      </div>
                      <div className="table">
                        <table>
                          <tr>
                            <th>Product ID</th>
                            <th style={{ textAlign: "center" }}>Name</th>
                            <th style={{ textAlign: "center" }}>Price</th>
                            <th style={{ textAlign: "center" }}>
                              Available Pieces
                            </th>
                            <th style={{ textAlign: "center" }}>Delete</th>
                          </tr>
                          {this.state.products.map((product) => (
                            <tr>
                              <td>{product.id}</td>
                              <td style={{ textAlign: "center" }}>
                                {product.name}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {product.price}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {product.available_pcs}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <button
                                  onClick={() => {
                                    this.setState({
                                      openConfirmation: true,
                                      deleteId: product.id,
                                    });
                                  }}
                                >
                                  <DeleteForever style={{ fill: "#f37757" }} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </table>
                        <button
                          className="button"
                          onClick={() =>
                            this.setState({ openNewProduct: true })
                          }
                        >
                          Add new product
                        </button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.openNewShop}
          onClose={() => this.setState({ openNewShop: false })}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.openNewShop}>
            <div className="card-popup">
              <div className="close-popup-button">
                <p className="titles-text">Add new shop</p>
                <button
                  type="button"
                  onClick={() => this.setState({ openNewShop: false })}
                >
                  <CancelIcon style={{ fill: "#f37757" }} />
                </button>
              </div>
              <div className="newMovie">
                <div className="element TextField-radius">
                  <TextField
                    type="text"
                    name="name"
                    label="Movie Name"
                    variant="outlined"
                    defaultValue={this.state.shopName}
                    fullWidth
                    disabled
                  />
                </div>
                <div className="element TextField-radius">
                  <FormControl fullWidth>
                    <InputLabel>Storage Facility</InputLabel>
                    <Select
                      label="Storage Facility"
                      value={this.state.storage_id}
                      onChange={(event) =>
                        this.handleChange(event.target.value)
                      }
                    >
                      {this.state.storage
                        ? this.state.storage.map((storage) => (
                            <MenuItem value={storage.id}>
                              {storage.id + " " + storage.capacity}
                            </MenuItem>
                          ))
                        : ""}
                      <MenuItem value={0}>Select</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <button
                  className="button"
                  onClick={() => {
                    this.addNewShop();
                  }}
                >
                  Add new shop
                </button>
              </div>
            </div>
          </Fade>
        </Modal>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.openNewProduct}
          onClose={() =>
            this.setState({
              openNewProduct: false,
              newProduct: {
                name: null,
                available_pcs: null,
                price: null,
              },
            })
          }
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.openNewProduct}>
            <div className="card-popup">
              <div className="close-popup-button">
                <p className="titles-text">Add new product</p>
                <button
                  type="button"
                  onClick={() =>
                    this.setState({
                      openNewProduct: false,
                      newProduct: {
                        name: null,
                        available_pcs: null,
                        price: null,
                      },
                    })
                  }
                >
                  <CancelIcon style={{ fill: "#f37757" }} />
                </button>
              </div>
              <div className="newMovie">
                <div className="element TextField-radius">
                  <TextField
                    type="text"
                    name="ProdctName"
                    label="Prodct Name"
                    variant="outlined"
                    fullWidth
                    onChange={(event) => {
                      this.handleChangeProduct("name", event.target.value);
                    }}
                  />
                </div>
                <div className="element TextField-radius">
                  <TextField
                    type="number"
                    name="name"
                    label="Available Pieces"
                    variant="outlined"
                    onChange={(event) => {
                      this.handleChangeProduct("available", event.target.value);
                    }}
                    fullWidth
                  />
                </div>
                <div className="element TextField-radius">
                  <TextField
                    type="number"
                    name="name"
                    label="Price"
                    variant="outlined"
                    onChange={(event) => {
                      this.handleChangeProduct("price", event.target.value);
                    }}
                    fullWidth
                  />
                </div>
                <button
                  className="button"
                  onClick={() => {
                    this.addNewProduct();
                  }}
                >
                  Add new product
                </button>
              </div>
            </div>
          </Fade>
        </Modal>
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
                  Are you sure you want to delete this product?
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
                  By deleting this product you're deleting all the orders and
                  deliveries associated with it.
                </p>
              </div>
              <div className="newMovie">
                <button
                  className="button"
                  onClick={() => {
                    this.deleteProduct();
                  }}
                >
                  Delete product
                </button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default Shops;
