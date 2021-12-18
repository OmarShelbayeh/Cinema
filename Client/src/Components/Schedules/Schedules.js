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

class Schedules extends Component {
  state = {
    allSchedules: [],
    newSchedule: {
      movie_id: null,
      stage_id: null,
      showing_at: null,
      price: null,
    },

    openNewSchedule: false,
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
        .catch(() => {
          this.props.error("Couldn't add a new schedule :(");
        });
    } else {
      this.props.warning("Missing Data!");
    }
  }

  deleteSchedule(id) {
    axios({
      url: URL + "/schedules/deleteSchedule",
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        id: id,
      },
    })
      .then(() => {
        this.props.success("Successfully deleted schedule!");
        this.getSchedule();
      })
      .catch(() => {
        this.props.error("Couldn't delete schedule :(");
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
          <div className="table">
            <table>
              <tr>
                <th>Movie Name</th>
                <th style={{ textAlign: "center" }}>Stage Name</th>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>Time</th>
                <th style={{ textAlign: "center" }}>Price</th>
                <th style={{ textAlign: "center" }}>Delete</th>
              </tr>
              {this.state.allSchedules.map((schedule) => (
                <tr>
                  <td>{schedule.moviename}</td>
                  <td style={{ textAlign: "center" }}>{schedule.stagename}</td>
                  <td style={{ textAlign: "center" }}>
                    {new Date(schedule.date).getDate() +
                      "/" +
                      new Date(schedule.date).getMonth() +
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
                    <button
                      onClick={() => {
                        this.deleteSchedule(schedule.id);
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
                      label="DateTimePicker"
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
      </div>
    );
  }
}

export default Schedules;
