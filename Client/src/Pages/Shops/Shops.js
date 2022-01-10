import React, { Component } from "react";
import axios from "axios";

//COmponents
import Header from "../../Components/General/Header";

//Services
import URL from "../../Services/URL";

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

class Shops extends Component {
  state = {
    allMovies: [],
    shop: null,
    newShop: false,
    shopName: "",
    movie_id: null,
    openNewShop: false,
    storage_id: 0,
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

  handleChange(value) {
    this.setState({ storage_id: value });
  }

  render() {
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
                              this.getShop(movie.id);
                            }}
                          >
                            <OpenInNewIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </table>
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
      </div>
    );
  }
}

export default Shops;
