import axios from "axios";
import React, { Component } from "react";

//services
import URL from "../../Services/URL";

//Material UI
import HistoryIcon from "@mui/icons-material/History";

class UserHistory extends Component {
  state = {
    history: [],
  };

  componentDidMount() {
    this.getHistory();
  }

  getHistory() {
    axios({
      url: URL + "/tickets/history",
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }).then((response) => {
      this.setState({ history: response.data });
    });
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
                <th>Movie Name</th>
                <th style={{ textAlign: "center" }}>Date</th>
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
