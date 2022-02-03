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

    search: {
      date: new Date(),
      movieName: 0,
    },
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

  getSchedule() {
    axios({
      url: URL + "/schedules/allSchedules",
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }).then((response) => {
      this.setState({ allSchedules: response.data });
    });
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

  buy(id) {
    window.location.href = "/buy?id=" + id;
  }

  search() {
    axios({
      url: URL + "/schedules/search",
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: this.state.search,
    }).then((response) => {
      this.setState({ allSchedules: response.data });
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
                  <th>Movie Name</th>
                  <th style={{ textAlign: "center" }}>Stage Name</th>
                  <th style={{ textAlign: "center" }}>Date</th>
                  <th style={{ textAlign: "center" }}>Time</th>
                  <th style={{ textAlign: "center" }}>Price</th>
                  <th style={{ textAlign: "center" }}>Available tickets</th>
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
