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

    openNewStage: false,
  };

  componentDidMount() {
    this.getAllStages();
  }

  getAllStages() {
    axios({
      url: URL + "/stages/allStages",
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }).then((response) => {
      this.setState({ allStages: response.data });
    });
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
          this.setState({ openNewStage: false });
          this.getAllStages();
          this.props.success("Successfully added new stage!");
        })
        .catch(() => {
          this.props.error("Couldn't add stage :(");
        });
    } else {
      this.props.warning("You need to fill all the fields");
    }
  }

  deleteStage(id) {
    axios({
      url: URL + "/stages/deleteStage",
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        id: id,
      },
    })
      .then(() => {
        this.props.success("Successfully deleted stage!");
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
    if (!AuthenticationService.isUserLoggedIn()) {
      window.location.href = "/login";
    }
    if (AuthenticationService.getRole() !== "ADMIN") {
      window.location.href = "/dashboard";
    }
    return (
      <div className="allMovies">
        <div className="table-container">
          <div className="title">
            <TheatersIcon />
            <div className="text">All movies</div>
          </div>
          <table>
            <tr>
              <th>Stage Name</th>
              <th style={{textAlign: 'center'}}>Rows</th>
              <th style={{textAlign: 'center'}}>Seats in row</th>
              <th style={{textAlign: 'center'}}>Number of seats</th>
              <th style={{textAlign: 'center'}}>Delete</th>
            </tr>
            {this.state.allStages.length > 0
              ? this.state.allStages.map((stage) => (
                  <tr>
                    <td>{stage.stage_name}</td>
                    <td style={{textAlign: 'center'}}>{stage.rows}</td>
                    <td style={{textAlign: 'center'}}>{stage.seats_in_row}</td>
                    <td style={{textAlign: 'center'}}>{stage.number_of_seats}</td>
                    <td style={{textAlign: 'center'}}>
                      <button
                        onClick={() => {
                          this.deleteStage(stage.id);
                        }}
                      >
                        <DeleteForeverIcon style={{ fill: "#f37757" }} />
                      </button>
                    </td>
                  </tr>
                ))
              : ""}
          </table>
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
                    type="text"
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
                    type="text"
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
                    type="text"
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
      </div>
    );
  }
}

export default Stages;
