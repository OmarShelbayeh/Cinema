import axios from "axios";
import React, { Component } from "react";
import URL from "../../Services/URL";
import "./css/AllMovies.css";

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

    success: false,
    successMsg: "",
    error: false,
    errorMsg: "",
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
        <table>
          <tr>
            <th>Movie Name</th>
            <th>Director</th>
            <th>Owner</th>
            <th>Delete</th>
          </tr>
          {this.state.allMovies.map((movie) => (
            <tr>
              <td>{movie.name}</td>
              <td>{movie.director}</td>
              <td>{movie.director}</td>
              <td>
                <button
                  onClick={() => {
                    this.deleteMovie(movie.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
        <div className="newMovie">
          <input
            type="text"
            name="name"
            placeholder="Movie Name"
            onChange={(event) =>
              this.handleChange(event.target.name, event.target.value)
            }
          />
          <input
            type="text"
            name="director"
            placeholder="Director Name"
            onChange={(event) =>
              this.handleChange(event.target.name, event.target.value)
            }
          />
          <input
            type="text"
            name="owner"
            placeholder="Owner Name"
            onChange={(event) =>
              this.handleChange(event.target.name, event.target.value)
            }
          />
          <button
            onClick={() => {
              this.addNewMovie();
            }}
          >
            Add new movie
          </button>
        </div>
        {this.state.error ? <h1>{this.state.errorMsg}</h1> : ""}
      </div>
    );
  }
}

export default AllMovies;
