import React, { Component } from "react";
import axios from "axios";

//COmponents
import Header from "../../Components/General/Header";

//Services
import URL from "../../Services/URL";

//Material UI
import StorefrontIcon from "@mui/icons-material/Storefront";

class Shops extends Component {
  state = {
    allMovies: [],
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
                    <StorefrontIcon />
                    <div className="text">All movies</div>
                  </div>
                  <div className="table">
                    <table>
                      <tr>
                        <th>Movie Name</th>
                        <th style={{ textAlign: "center" }}>Director</th>
                        <th style={{ textAlign: "center" }}>Owner</th>
                        <th style={{ textAlign: "center" }}>Delete</th>
                      </tr>
                      {this.state.allMovies.map((movie) => (
                        <tr>
                          <td>{movie.name}</td>
                          <td style={{ textAlign: "center" }}>
                            {movie.director}
                          </td>
                          <td style={{ textAlign: "center" }}>{movie.owner}</td>
                          <td style={{ textAlign: "center" }}></td>
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
              </div>
            </div>
            <div className="column"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Shops;
