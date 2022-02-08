import axios from "axios";
import React, { Component } from "react";

//services
import URL from "../../Services/URL";

//Material UI
import HistoryIcon from "@mui/icons-material/History";

class UserHistory extends Component {
  state = {
    history: [],
    active: "date",
  };

  componentDidMount() {
    this.getHistory();
  }

  getHistory(order) {
    axios({
      url: URL + "/tickets/history",
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        order: order,
      },
    }).then((response) => {
      this.setState({ history: response.data });
    });
    if (order) {
      this.setState({ active: order });
    } else {
      this.setState({ active: "date" });
    }
  }

  render() {
    return (
      <div className="allMovies">
        <div className="table-container">
          <div className="title">
            <HistoryIcon />
            <div className="text">History</div>
          </div>
          <div className="table">
            <table>
              <tr>
                <th>
                  <a
                    onClick={() => {
                      this.getHistory("movie");
                    }}
                    className={this.state.active === "movie" ? "active" : ""}
                  >
                    Movie Name +
                  </a>
                </th>
                <th style={{ textAlign: "center" }}>
                  <a
                    onClick={() => {
                      this.getHistory();
                    }}
                    className={this.state.active === "date" ? "active" : ""}
                  >
                    Date +
                  </a>
                </th>
                <th style={{ textAlign: "center" }}>Time</th>
                <th style={{ textAlign: "center" }}>Tickets</th>
              </tr>
              {this.state.history.map((history) => (
                <tr>
                  <td>{history.name}</td>
                  <td style={{ textAlign: "center" }}>
                    {new Date(history.date).getDate() +
                      "/" +
                      (new Date(history.date).getMonth() + 1) +
                      "/" +
                      new Date(history.date).getFullYear()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {new Date(history.date).getHours() +
                      ":" +
                      new Date(history.date).getMinutes()}
                  </td>
                  <td style={{ textAlign: "center" }}>{history.tickets}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default UserHistory;
