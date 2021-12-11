import axios from "axios";
import React, { Component } from "react";
import URL from "../../Services/URL";

class AllMovies extends Component {
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
    axios({
      url: URL + "/movies/newMovie",
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        name: this.state.newMovie.name,
        director: this.state.newMovie.director,
        owner: this.state.newMovie.owner,
      },
    })
      .then(() => {
        this.setState({
          success: true,
          successMsg: "Successfully added new movie!",
          error: false,
        });
        this.getAllMovies();
      })
      .catch(() => {
        this.setState({
          error: true,
          errorMsg: "Couldn't add movie :(",
          success: false,
        });
      });
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
        this.setState({
          success: true,
          successMsg: "Successfully deleted movie!",
          error: false,
        });
        this.getAllMovies();
      })
      .catch(() => {
        this.setState({
          error: true,
          errorMsg: "Couldn't delete movie :(",
          success: false,
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.allMovies.map((movie) => (
          <div>
            <p>{movie.name}</p>
            <p>{movie.director}</p>
            <p>{movie.owner}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default AllMovies;
