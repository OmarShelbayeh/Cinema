import React, { Component } from "react";
import axios from "axios";

//Services
import URL from "../../Services/URL";

//Material UI
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DateRangeIcon from "@mui/icons-material/DateRange";

class UserSchedules extends Component {
  state = {
    allSchedules: [],
  };

  componentDidMount() {
    this.getSchedule();
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

  buy(id) {
    window.location.href = "/buy?id=" + id;
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
                <th style={{ textAlign: "center" }}>Buy</th>
              </tr>
              {this.state.allSchedules.map((schedule) => (
                <tr>
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
                    <button
                      onClick={() => {
                        this.buy(schedule.id);
                      }}
                    >
                      <ShoppingCartIcon style={{ fill: "#f37757" }} />
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default UserSchedules;
