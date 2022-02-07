import React, { Component } from "react";
import axios from "axios";

//Services
import URL from "../../Services/URL";

//Material UI
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Menu, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

class UserSchedules extends Component {
  state = {
    allSchedules: [],
    allMovies: [],

    active: "date",
    search: {
      date: new Date(),
      movieName: 0,
    },

    searching: false,
  };

  async componentDidMount() {
    await this.getSchedule();
    await this.getAllMovies();
  }

  clearState() {
    this.setState({
      newSchedule: {
        movie_id: null,
        stage_id: null,
        showing_at: null,
        price: null,
      },
      openNewSchedule: false,
      search: {
        date: null,
        movieName: null,
      },
    });
  }

  async getSchedule(order) {
    if (!this.state.searching) {
      axios({
        url: URL + "/schedules/allSchedules",
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
        },
        data: {
          order: order,
        },
      }).then((response) => {
        this.setState({ allSchedules: response.data });
      });
      if (order) {
        this.setState({ active: order });
      } else {
        this.setState({ active: "date" });
      }
    } else {
      if (order) {
        await this.setState({ active: order });
        this.search(order);
      } else {
        await this.setState({ active: "date" });
        this.search();
      }
    }
  }

  getAllMovies() {
    axios({
      url: URL + "/movies/allMovies",
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }).then((response) => {
      this.setState({ allMovies: response.data });
    });
  }

  buy(id) {
    window.location.href = "/buy?id=" + id;
  }

  search(order) {
    axios({
      url: URL + "/schedules/search",
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        search: this.state.search,
        order:
          this.state.active === "date"
            ? null
            : order
            ? order
            : this.state.active,
      },
    }).then((response) => {
      this.setState({ allSchedules: response.data, searching: true });
    });
  }

  render() {
    return (
      <div className="allMovies">
        <div className="table-container" style={{ marginTop: "12px" }}>
          <div className="title">
            <DateRangeIcon />
            <div className="text">All Schedules</div>
          </div>
          <div className="search TextField-radius">
            <SearchIcon />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date"
                minDate={new Date()}
                value={this.state.search.date}
                onChange={(value) =>
                  this.setState({
                    search: {
                      date: value,
                      movieName: this.state.search.movieName,
                    },
                  })
                }
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
            <FormControl fullWidth>
              <InputLabel>Movie Name</InputLabel>
              <Select
                value={this.state.search.movieName}
                label="Movie Name"
                onChange={(e) =>
                  this.setState({
                    search: {
                      date: this.state.search.date,
                      movieName: e.target.value,
                    },
                  })
                }
              >
                <MenuItem value={0}>All Movies</MenuItem>
                {this.state.allMovies.length > 0
                  ? this.state.allMovies.map((movie) => (
                      <MenuItem value={movie.name}>{movie.name}</MenuItem>
                    ))
                  : ""}
              </Select>
            </FormControl>
            <button
              className="button"
              onClick={() => {
                this.search();
              }}
              style={{ marginTop: "0px" }}
            >
              Search
            </button>
          </div>
          <div className="table">
            {this.state.allSchedules.length > 0 ? (
              <table>
                <tr>
                  <th>
                    <a
                      onClick={() => {
                        this.getSchedule("movieName");
                      }}
                      className={
                        this.state.active === "movieName" ? "active" : ""
                      }
                    >
                      Movie Name +
                    </a>
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <a
                      onClick={() => {
                        this.getSchedule("stageName");
                      }}
                      className={
                        this.state.active === "stageName" ? "active" : ""
                      }
                    >
                      Stage Name +
                    </a>
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <a
                      onClick={() => {
                        this.getSchedule();
                      }}
                      className={this.state.active === "date" ? "active" : ""}
                    >
                      Date +
                    </a>
                  </th>
                  <th style={{ textAlign: "center" }}>Time</th>
                  <th style={{ textAlign: "center" }}>
                    <a
                      onClick={() => {
                        this.getSchedule("price");
                      }}
                      className={this.state.active === "price" ? "active" : ""}
                    >
                      Price +
                    </a>
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <a
                      onClick={() => {
                        this.getSchedule("availableSeats");
                      }}
                      className={
                        this.state.active === "availableSeats" ? "active" : ""
                      }
                    >
                      Available Tickets +
                    </a>
                  </th>
                  <th style={{ textAlign: "center" }}>Buy</th>
                </tr>
                {this.state.allSchedules.map((schedule) => (
                  <tr
                    style={
                      schedule.available_seats <= 0
                        ? { color: "red" }
                        : { color: "black" }
                    }
                  >
                    <td>{schedule.moviename}</td>
                    <td style={{ textAlign: "center" }}>
                      {schedule.stagename}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {new Date(schedule.date).getDate() +
                        "/" +
                        (new Date(schedule.date).getMonth() + 1) +
                        "/" +
                        new Date(schedule.date).getFullYear()}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {new Date(schedule.date).getHours() +
                        ":" +
                        new Date(schedule.date).getMinutes()}
                    </td>
                    <td style={{ textAlign: "center" }}>{schedule.price}</td>
                    <td style={{ textAlign: "center" }}>
                      {schedule.available_seats > 0
                        ? schedule.available_seats
                        : "Fully booked"}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {schedule.available_seats > 0 ? (
                        <button
                          onClick={() => {
                            this.buy(schedule.id);
                          }}
                        >
                          <ShoppingCartIcon style={{ fill: "#f37757" }} />
                        </button>
                      ) : (
                        <ShoppingCartIcon style={{ fill: "grey" }} />
                      )}
                    </td>
                  </tr>
                ))}
              </table>
            ) : (
              <h4>No schedules found</h4>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UserSchedules;
