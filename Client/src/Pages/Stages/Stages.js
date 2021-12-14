import axios from "axios";
import React, { Component } from "react";
import URL from "../../Services/URL";

class Stages extends Component {
  state = {
    allStages: [],
    newStage: {
      stage_name: "",
      rows: "",
      seats_in_row: "",
      number_of_seats: "",
    },

    success: false,
    successMsg: "",
    error: false,
    errorMsg: "",
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
          this.setState({
            success: true,
            successMsg: "Successfully added new stage!",
            error: false,
          });
          this.getAllStages();
        })
        .catch(() => {
          this.setState({
            error: true,
            errorMsg: "Couldn't add stage :(",
            success: false,
          });
        });
    } else {
      this.setState({
        error: true,
        errorMsg: "You need to fill all the fields",
        success: false,
      });
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
        this.setState({
          success: true,
          successMsg: "Successfully deleted movie!",
          error: false,
        });
        this.getAllStages();
      })
      .catch(() => {
        this.setState({
          error: true,
          errorMsg: "Couldn't delete movie :(",
          success: false,
        });
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
        <table>
          <tr>
            <th>Stage Name</th>
            <th>Rows</th>
            <th>Seats in row</th>
            <th>Number of seats</th>
          </tr>
          {this.state.allStages.length > 0
            ? this.state.allStages.map((stage) => (
                <tr>
                  <td>{stage.stage_name}</td>
                  <td>{stage.rows}</td>
                  <td>{stage.seats_in_row}</td>
                  <td>{stage.number_of_seats}</td>
                  <td>
                    <button
                      onClick={() => {
                        this.deleteStage(stage.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : ""}
        </table>
        <div className="newMovie">
          <input
            type="text"
            name="stage_name"
            placeholder="Stage Name"
            onChange={(event) =>
              this.handleChange(event.target.name, event.target.value)
            }
          />
          <input
            type="text"
            name="rows"
            placeholder="Number of rows"
            onChange={(event) =>
              this.handleChange(event.target.name, event.target.value)
            }
          />
          <input
            type="text"
            name="seats_in_row"
            placeholder="Number of seats in each row"
            onChange={(event) =>
              this.handleChange(event.target.name, event.target.value)
            }
          />
          <input
            type="text"
            name="number_of_seats"
            placeholder="Total number of seats"
            onChange={(event) =>
              this.handleChange(event.target.name, event.target.value)
            }
          />
          <button
            onClick={() => {
              this.addNewStage();
            }}
          >
            Add new stage
          </button>
        </div>
        {this.state.error ? <h1>{this.state.errorMsg}</h1> : ""}
      </div>
    );
  }
}

export default Stages;
