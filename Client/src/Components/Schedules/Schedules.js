import React, { Component } from "react";
import axios from "axios";

//Services
import URL from "../../Services/URL";

//Material UI
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import DateRangeIcon from "@mui/icons-material/DateRange";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import SearchIcon from "@mui/icons-material/Search";

class Schedules extends Component {
  state = {
    allSchedules: [],
    newSchedule: {
      movie_id: null,
      stage_id: null,
      showing_at: null,
      price: null,
    },

    deleteId: null,
    active: "date",
    openConfirmation: false,
    openNewSchedule: false,

    search: {
      date: new Date(),
      movieName: 0,
    },

    searching: false,
  };

  componentDidMount() {
    this.getSchedule();
  }

  handleChange(change, value) {
    switch (change) {
      case "stage":
        this.setState({
          newSchedule: {
            movie_id: this.state.newSchedule.movie_id,
            stage_id: value,
            showing_at: this.state.newSchedule.showing_at,
            price: this.state.newSchedule.price,
          },
        });
        break;
      case "movie":
        this.setState({
          newSchedule: {
            movie_id: value,
            stage_id: this.state.newSchedule.stage_id,
            showing_at: this.state.newSchedule.showing_at,
            price: this.state.newSchedule.price,
          },
        });
        break;
      case "date":
        this.setState({
          newSchedule: {
            movie_id: this.state.newSchedule.movie_id,
            stage_id: this.state.newSchedule.stage_id,
            showing_at: new Date(value),
            price: this.state.newSchedule.price,
          },
        });
        break;
      case "price":
        this.setState({
          newSchedule: {
            movie_id: this.state.newSchedule.movie_id,
            stage_id: this.state.newSchedule.stage_id,
            showing_at: this.state.newSchedule.showing_at,
            price: value,
          },
        });
        break;
      default:
        break;
    }
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

  addNewSchedule() {
    if (
      this.state.newSchedule.showing_at &&
      this.state.newSchedule.movie_id &&
      this.state.newSchedule.price &&
      this.state.newSchedule.stage_id
    ) {
      axios({
        url: URL + "/schedules/newSchedule",
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
        },
        data: this.state.newSchedule,
      })
        .then(() => {
          this.props.success("Successfully added a new schedule!");
          this.getSchedule();
          this.clearState();
        })
        .catch((error) => {
          if (error.response.data) {
            this.props.error(error.response.data);
          } else {
            this.props.error("Couldn't add a new schedule :(");
          }
        });
    } else {
      this.props.warning("Missing Data!");
    }
  }

  deleteSchedule() {
    axios({
      url: URL + "/schedules/deleteSchedule",
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        id: this.state.deleteId,
      },
    })
      .then(() => {
        this.props.success("Successfully deleted schedule!");
        this.setState({ openConfirmation: false, deleteId: null });
        this.getSchedule();
      })
      .catch(() => {
        this.props.error("Couldn't delete schedule :(");
      });
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
                {this.props.allMovies.length > 0 ? (
                  this.props.allMovies.map((movie) => (
                    <MenuItem value={movie.name}>{movie.name}</MenuItem>
                  ))
                ) : (
                  <MenuItem></MenuItem>
                )}
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
                <th style={{ textAlign: "center" }}>Delete</th>
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
                  <td style={{ textAlign: "center" }}>{schedule.stagename}</td>
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
                    <button
                      onClick={() => {
                        this.setState({
                          deleteId: schedule.id,
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
            onClick={() => this.setState({ openNewSchedule: true })}
          >
            Add new schedule
          </button>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.openNewSchedule}
          onClose={() => this.setState({ openNewSchedule: false })}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.openNewSchedule}>
            <div className="card-popup">
              <div className="close-popup-button">
                <p className="titles-text">Add new schedule</p>
                <button
                  type="button"
                  onClick={() => this.setState({ openNewSchedule: false })}
                >
                  <CancelIcon style={{ fill: "#f37757" }} />
                </button>
              </div>
              <div className="newMovie">
                <div className="element TextField-radius">
                  <FormControl required fullWidth>
                    <InputLabel>Movie Name</InputLabel>
                    <Select
                      label="Movie Name"
                      onChange={(event) =>
                        this.handleChange("movie", event.target.value)
                      }
                    >
                      {this.props.allMovies
                        ? this.props.allMovies.map((movie) => (
                            <MenuItem value={movie.id}>{movie.name}</MenuItem>
                          ))
                        : ""}
                    </Select>
                  </FormControl>
                </div>
                <div className="element TextField-radius">
                  <FormControl required fullWidth>
                    <InputLabel>Stage Name</InputLabel>
                    <Select
                      label="Stage Name"
                      onChange={(event) =>
                        this.handleChange("stage", event.target.value)
                      }
                    >
                      {this.props.allStages
                        ? this.props.allStages.map((stage) => (
                            <MenuItem value={stage.id}>
                              {stage.stage_name}
                            </MenuItem>
                          ))
                        : ""}
                    </Select>
                  </FormControl>
                </div>
                <div className="element TextField-radius">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      minDateTime={new Date()}
                      renderInput={(props) => (
                        <TextField fullWidth {...props} />
                      )}
                      label="Date and Time"
                      value={this.state.newSchedule.showing_at}
                      onChange={(newValue) => {
                        this.handleChange("date", new Date(newValue));
                      }}
                      fullWidth
                    />
                  </LocalizationProvider>
                </div>
                <div className="element TextField-radius">
                  <FormControl required fullWidth>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Price
                    </InputLabel>
                    <OutlinedInput
                      type="number"
                      onChange={(event) =>
                        this.handleChange("price", event.target.value)
                      }
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Price"
                    />
                  </FormControl>
                </div>

                <button
                  className="button"
                  onClick={() => {
                    this.addNewSchedule();
                  }}
                >
                  Add new schedule
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
                  Are you sure you want to delete this schedule?
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
                  By deleting this schedule you're deleting all the tickets
                  associated with it.
                </p>
              </div>
              <div className="newMovie">
                <button
                  className="button"
                  onClick={() => {
                    this.deleteSchedule();
                  }}
                >
                  Delete schedule
                </button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default Schedules;
