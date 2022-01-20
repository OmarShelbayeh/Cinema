import axios from "axios";
import React, { Component } from "react";

//Services
import URL from "../../Services/URL";
import AuthenticationService from "../../Services/AuthenticationService";

//Material UI
import TheatersIcon from "@mui/icons-material/Theaters";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";

class Stages extends Component {
  constructor() {
    super();
  }

  state = {
    allStages: [],
    newStage: {
      stage_name: "",
      rows: "",
      seats_in_row: "",
      number_of_seats: "",
    },

    openConfirmation: false,
    deleteId: null,
    openNewStage: false,
  };

  clearState() {
    this.setState({
      newStage: {
        stage_name: "",
        rows: "",
        seats_in_row: "",
        number_of_seats: "",
      },

      openNewStage: false,
    });
  }

  componentDidMount() {
    this.getAllStages();
  }

  getAllStages() {
    this.props.getAllStages();
  }

  addNewStage() {
    if (
      this.state.newStage.stage_name &&
      this.state.newStage.number_of_seats &&
      this.state.newStage.rows &&
      this.state.newStage.seats_in_row
    ) {
      axios({
        url: URL + "/stages/newStage",
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
        },
        data: this.state.newStage,
      })
        .then(() => {
          this.getAllStages();
          this.props.success("Successfully added new stage!");
          this.clearState();
        })
        .catch(() => {
          this.props.error("Couldn't add stage :(");
        });
    } else {
      this.props.warning("You need to fill all the fields");
    }
  }

  deleteStage() {
    axios({
      url: URL + "/stages/deleteStage",
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        id: this.state.deleteId,
      },
    })
      .then(() => {
        this.props.success("Successfully deleted stage!");
        this.setState({ openConfirmation: false, deleteId: null });
        this.getAllStages();
      })
      .catch(() => {
        this.props.error("Couldn't delete stage :(");
      });
  }

  handleChange(change, value) {
    switch (change) {
      case "stage_name":
        this.setState({
          newStage: {
            stage_name: value,
            rows: this.state.newStage.rows,
            seats_in_row: this.state.newStage.seats_in_row,
            number_of_seats: this.state.newStage.number_of_seats,
          },
        });
        break;
      case "rows":
        this.setState({
          newStage: {
            stage_name: this.state.newStage.stage_name,
            rows: value,
            seats_in_row: this.state.newStage.seats_in_row,
            number_of_seats: this.state.newStage.number_of_seats,
          },
        });
        break;
      case "seats_in_row":
        this.setState({
          newStage: {
            stage_name: this.state.newStage.stage_name,
            rows: this.state.newStage.rows,
            seats_in_row: value,
            number_of_seats: this.state.newStage.number_of_seats,
          },
        });
        break;
      case "number_of_seats":
        this.setState({
          newStage: {
            stage_name: this.state.newStage.stage_name,
            rows: this.state.newStage.rows,
            seats_in_row: this.state.newStage.seats_in_row,
            number_of_seats: value,
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
            <TheatersIcon />
            <div className="text">All Stages</div>
          </div>
          <div className="table">
            <table>
              <tr>
                <th>Stage Name</th>
                <th style={{ textAlign: "center" }}>Rows</th>
                <th style={{ textAlign: "center" }}>Seats in row</th>
                <th style={{ textAlign: "center" }}>Number of seats</th>
                <th style={{ textAlign: "center" }}>Delete</th>
              </tr>
              {this.props.allStages.length > 0
                ? this.props.allStages.map((stage) => (
                    <tr>
                      <td>{stage.stage_name}</td>
                      <td style={{ textAlign: "center" }}>{stage.rows}</td>
                      <td style={{ textAlign: "center" }}>
                        {stage.seats_in_row}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {stage.number_of_seats}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => {
                            this.setState({
                              deleteId: stage.id,
                              openConfirmation: true,
                            });
                          }}
                        >
                          <DeleteForeverIcon style={{ fill: "#f37757" }} />
                        </button>
                      </td>
                    </tr>
                  ))
                : ""}
            </table>
          </div>
          <button
            className="button"
            onClick={() => this.setState({ openNewStage: true })}
          >
            Add new stage
          </button>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.openNewStage}
          onClose={() => this.setState({ openNewStage: false })}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.openNewStage}>
            <div className="card-popup">
              <div className="close-popup-button">
                <p className="titles-text">Add new movie</p>
                <button
                  type="button"
                  onClick={() => this.setState({ openNewStage: false })}
                >
                  <CancelIcon style={{ fill: "#f37757" }} />
                </button>
              </div>
              <div className="newMovie">
                <div className="element TextField-radius">
                  <TextField
                    type="text"
                    name="stage_name"
                    onChange={(event) =>
                      this.handleChange(event.target.name, event.target.value)
                    }
                    label="Stage Name"
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="element TextField-radius">
                  <TextField
                    type="number"
                    name="rows"
                    onChange={(event) =>
                      this.handleChange(event.target.name, event.target.value)
                    }
                    label="Number of rows"
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="element TextField-radius">
                  <TextField
                    type="number"
                    name="seats_in_row"
                    onChange={(event) =>
                      this.handleChange(event.target.name, event.target.value)
                    }
                    label="Number of seats in each row"
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="element TextField-radius">
                  <TextField
                    type="number"
                    name="number_of_seats"
                    onChange={(event) =>
                      this.handleChange(event.target.name, event.target.value)
                    }
                    label="Total number of seats"
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <button
                  className="button"
                  onClick={() => {
                    this.addNewStage();
                  }}
                >
                  Add new stage
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
                  Are you sure you want to delete this stage?
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
                  By deleting this stage you're deleting all the tickets and
                  schedules associated with it.
                </p>
              </div>
              <div className="newMovie">
                <button
                  className="button"
                  onClick={() => {
                    this.deleteStage();
                  }}
                >
                  Delete stage
                </button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default Stages;
