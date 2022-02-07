import axios from "axios";
import React, { Component } from "react";

//services
import URL from "../../Services/URL";

//css
import "./css/AllMovies.css";

//Material UI
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import MovieIcon from "@mui/icons-material/Movie";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";

class AllMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMovies: this.props.allMovies,
      newMovie: {
        name: "",
        director: "",
        owner: "",
      },

      openEdit: false,
      deleteId: null,
      openConfirmation: false,
      openNewMovie: false,
      search: false,
    };
  }

  state = {
    allMovies: [],
    newMovie: {
      name: "",
      director: "",
      owner: "",
    },

    openEdit: false,
    deleteId: null,
    openConfirmation: false,
    openNewMovie: false,
    search: false,
  };

  async componentDidMount() {
    await this.getAllMovies();
    this.setState({ search: false });
  }

  async getAllMovies() {
    await this.props.getAllMovies();
    this.setState({ allMovies: this.props.allMovies });
    this.setState({ search: false });
  }

  addNewMovie() {
    if (
      this.state.newMovie.name &&
      this.state.newMovie.owner &&
      this.state.newMovie.director
    ) {
      axios({
        url: URL + "/movies/newMovie",
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
        },
        data: this.state.newMovie,
      })
        .then(() => {
          this.props.success("Successfully added new movie!");
          this.getAllMovies();
          this.clearState();
        })
        .catch(() => {
          this.props.error("Couldn't add movie :(");
        });
    } else {
      this.props.warning("You need to fill all the fields");
    }
  }

  deleteMovie() {
    axios({
      url: URL + "/movies/deleteMovie",
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        id: this.state.deleteId,
      },
    })
      .then(() => {
        this.props.success("Successfully deleted movie!");
        this.setState({ openConfirmation: false, deleteId: null });
        this.getAllMovies();
      })
      .catch(() => {
        this.props.error("Couldn't delete movie :(");
      });
  }

  clearState() {
    this.setState({
      newMovie: {
        name: null,
        director: null,
        owner: null,
      },
      openEdit: false,
      openNewMovie: false,
    });
  }

  editMovie() {
    if (
      this.state.newMovie.id &&
      this.state.newMovie.name &&
      this.state.newMovie.owner &&
      this.state.newMovie.director
    ) {
      axios({
        url: URL + "/movies/editMovie",
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
        },
        data: this.state.newMovie,
      })
        .then((response) => {
          this.props.success(response.data);
          this.getAllMovies();
          this.clearState();
        })
        .catch((error) => {
          this.props.error(error.response.data);
        });
    } else {
      this.props.warning("You need to fill all the fields");
    }
  }

  handleChange(change, value) {
    switch (change) {
      case "name":
        this.setState({
          newMovie: {
            id: this.state.newMovie.id,
            name: value,
            director: this.state.newMovie.director,
            owner: this.state.newMovie.owner,
          },
        });
        break;
      case "director":
        this.setState({
          newMovie: {
            id: this.state.newMovie.id,
            name: this.state.newMovie.name,
            director: value,
            owner: this.state.newMovie.owner,
          },
        });
        break;
      case "owner":
        this.setState({
          newMovie: {
            id: this.state.newMovie.id,
            name: this.state.newMovie.name,
            director: this.state.newMovie.director,
            owner: value,
          },
        });
        break;
      default:
        break;
    }
  }

  search(param, string) {
    let items = this.props.allMovies;
    let matches = [];
    if (string === "") {
      this.setState({ search: false, allMovies: items });
    } else {
      switch (param) {
        case "movie":
          matches = items.filter((s) =>
            s.name.toLowerCase().includes(string.toLowerCase())
          );
          break;
        case "director":
          matches = items.filter((s) =>
            s.director.toLowerCase().includes(string.toLowerCase())
          );
          break;
        case "owner":
          matches = items.filter((s) =>
            s.owner.toLowerCase().includes(string.toLowerCase())
          );
          break;
      }
      this.setState({ allMovies: matches, search: true });
    }
  }

  render() {
    return (
      <div className="allMovies">
        <div className="table-container">
          <div className="title">
            <MovieIcon />
            <div className="text">All movies</div>
          </div>
          <div className="search TextField-radius">
            <SearchIcon />
            <TextField
              label="Movie Name"
              fullWidth
              onChange={(e) => {
                this.search("movie", e.target.value);
              }}
            />
            <TextField
              label="Director Name"
              fullWidth
              onChange={(e) => {
                this.search("director", e.target.value);
              }}
            />
            <TextField
              label="Owner Name"
              fullWidth
              onChange={(e) => {
                this.search("owner", e.target.value);
              }}
            />
          </div>
          <div className="table">
            <table>
              <tr>
                <th>Movie Name</th>
                <th style={{ textAlign: "center" }}>Director</th>
                <th style={{ textAlign: "center" }}>Owner</th>
                <th style={{ textAlign: "center" }}>Edit</th>
                <th style={{ textAlign: "center" }}>Delete</th>
              </tr>
              {this.state.search
                ? this.state.allMovies.map((movie) => (
                    <tr>
                      <td>{movie.name}</td>
                      <td style={{ textAlign: "center" }}>{movie.director}</td>
                      <td style={{ textAlign: "center" }}>{movie.owner}</td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => {
                            this.setState({
                              newMovie: movie,
                              openEdit: true,
                            });
                          }}
                        >
                          <EditIcon style={{ fill: "#638DFC" }} />
                        </button>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => {
                            this.setState({
                              deleteId: movie.id,
                              openConfirmation: true,
                            });
                          }}
                        >
                          <DeleteForeverIcon style={{ fill: "#f37757" }} />
                        </button>
                      </td>
                    </tr>
                  ))
                : this.props.allMovies.map((movie) => (
                    <tr>
                      <td>{movie.name}</td>
                      <td style={{ textAlign: "center" }}>{movie.director}</td>
                      <td style={{ textAlign: "center" }}>{movie.owner}</td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => {
                            this.setState({
                              newMovie: movie,
                              openEdit: true,
                            });
                          }}
                        >
                          <EditIcon style={{ fill: "#638DFC" }} />
                        </button>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => {
                            this.setState({
                              deleteId: movie.id,
                              openConfirmation: true,
                            });
                          }}
                        >
                          <DeleteForeverIcon style={{ fill: "#f37757" }} />
                        </button>
                      </td>
                    </tr>
                  ))}
            </table>
          </div>
          <button
            className="button"
            onClick={() => this.setState({ openNewMovie: true })}
          >
            Add new movie
          </button>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.openNewMovie}
          onClose={() => this.setState({ openNewMovie: false })}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.openNewMovie}>
            <div className="card-popup">
              <div className="close-popup-button">
                <p className="titles-text">Add new movie</p>
                <button
                  type="button"
                  onClick={() => this.setState({ openNewMovie: false })}
                >
                  <CancelIcon style={{ fill: "#f37757" }} />
                </button>
              </div>
              <div className="newMovie">
                <div className="element TextField-radius">
                  <TextField
                    type="text"
                    name="name"
                    onChange={(event) =>
                      this.handleChange(event.target.name, event.target.value)
                    }
                    label="Movie Name"
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="element TextField-radius">
                  <TextField
                    type="text"
                    name="director"
                    onChange={(event) =>
                      this.handleChange(event.target.name, event.target.value)
                    }
                    label="Director Name"
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="element TextField-radius">
                  <TextField
                    type="text"
                    name="owner"
                    onChange={(event) =>
                      this.handleChange(event.target.name, event.target.value)
                    }
                    label="Owner Name"
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <button
                  className="button"
                  onClick={() => {
                    this.addNewMovie();
                  }}
                >
                  Add new movie
                </button>
              </div>
            </div>
          </Fade>
        </Modal>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.openEdit}
          onClose={() => this.clearState()}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.openEdit}>
            <div className="card-popup">
              <div className="close-popup-button">
                <p className="titles-text">Edit movie</p>
                <button type="button" onClick={() => this.clearState()}>
                  <CancelIcon style={{ fill: "#f37757" }} />
                </button>
              </div>
              <div className="newMovie">
                <div className="element TextField-radius">
                  <TextField
                    type="text"
                    name="name"
                    value={this.state.newMovie.name}
                    label="Movie Name"
                    variant="outlined"
                    disabled
                    fullWidth
                  />
                </div>
                <div className="element TextField-radius">
                  <TextField
                    type="text"
                    name="director"
                    value={this.state.newMovie.director}
                    onChange={(event) =>
                      this.handleChange(event.target.name, event.target.value)
                    }
                    label="Director Name"
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="element TextField-radius">
                  <TextField
                    type="text"
                    value={this.state.newMovie.owner}
                    name="owner"
                    onChange={(event) =>
                      this.handleChange(event.target.name, event.target.value)
                    }
                    label="Owner Name"
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <button
                  className="button"
                  onClick={() => {
                    this.editMovie();
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </Fade>
        </Modal>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.openConfirmation}
          onClose={() => this.clearState()}
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
                  Are you sure you want to delete this movie?
                </p>
                <button type="button" onClick={() => this.clearState()}>
                  <CancelIcon style={{ fill: "#f37757" }} />
                </button>
              </div>
              <div className="merch-popup-body">
                <p>
                  By deleting this movie you're deleting all the schedules and
                  tickets connected to it.
                </p>
              </div>
              <div className="newMovie">
                <button
                  className="button"
                  onClick={() => {
                    this.deleteMovie();
                  }}
                >
                  Delete movie
                </button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default AllMovies;
