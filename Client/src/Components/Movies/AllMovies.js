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

class AllMovies extends Component {
  constructor() {
    super();
  }

  state = {
    allMovies: [],
    newMovie: {
      name: "",
      director: "",
      owner: "",
    },

    openNewMovie: false,
  };

  componentDidMount() {
    this.getAllMovies();
  }

  getAllMovies() {
    this.props.getAllMovies();
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

  deleteMovie(id) {
    axios({
      url: URL + "/movies/deleteMovie",
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        id: id,
      },
    })
      .then(() => {
        this.props.success("Successfully deleted movie!");
        this.getAllMovies();
      })
      .catch(() => {
        this.props.error("Couldn't delete movie :(");
      });
  }

  clearState() {
    this.setState({
      newMovie: {
        name: "",
        director: "",
        owner: "",
      },

      openNewMovie: false,
    });
  }

  handleChange(change, value) {
    switch (change) {
      case "name":
        this.setState({
          newMovie: {
            name: value,
            director: this.state.newMovie.director,
            owner: this.state.newMovie.owner,
          },
        });
        break;
      case "director":
        this.setState({
          newMovie: {
            name: this.state.newMovie.name,
            director: value,
            owner: this.state.newMovie.owner,
          },
        });
        break;
      case "owner":
        this.setState({
          newMovie: {
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

  render() {
    return (
      <div className="allMovies">
        <div className="table-container">
          <div className="title">
            <MovieIcon />
            <div className="text">All movies</div>
          </div>
          <table>
            <tr>
              <th>Movie Name</th>
              <th style={{ textAlign: "center" }}>Director</th>
              <th style={{ textAlign: "center" }}>Owner</th>
              <th style={{ textAlign: "center" }}>Delete</th>
            </tr>
            {this.props.allMovies.map((movie) => (
              <tr>
                <td>{movie.name}</td>
                <td style={{ textAlign: "center" }}>{movie.director}</td>
                <td style={{ textAlign: "center" }}>{movie.director}</td>
                <td style={{ textAlign: "center" }}>
                  <button
                    onClick={() => {
                      this.deleteMovie(movie.id);
                    }}
                  >
                    <DeleteForeverIcon style={{ fill: "#f37757" }} />
                  </button>
                </td>
              </tr>
            ))}
          </table>
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
      </div>
    );
  }
}

export default AllMovies;
