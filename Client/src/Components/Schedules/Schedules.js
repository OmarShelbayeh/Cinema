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

class Schedules extends Component {
  state = {
    allSchedules: [],

    openNewSchedule: false,
  };

  componentDidMount() {
    this.getSchedule();
  }

  handleChange(change, value) {
      
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

  addNewSchedule() {}

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
          <table>
            <tr>
              <th>Movie Name</th>
              <th style={{ textAlign: "center" }}>Stage Name</th>
              <th style={{ textAlign: "center" }}>Date</th>
              <th style={{ textAlign: "center" }}>Price</th>
              <th style={{ textAlign: "center" }}>Delete</th>
            </tr>
            {this.state.allSchedules.map((schedule) => (
              <tr>
                <td>{schedule.moviename}</td>
                <td style={{ textAlign: "center" }}>{schedule.stagename}</td>
                <td style={{ textAlign: "center" }}>{schedule.date}</td>
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

export default Schedules;
