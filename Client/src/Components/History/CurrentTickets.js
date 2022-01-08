import axios from "axios";
import React, { Component } from "react";

//services
import URL from "../../Services/URL";

//Material UI
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import StorefrontIcon from "@mui/icons-material/Storefront";

class CurrentTickets extends Component {
  state = {
    CurrentTickets: [],
  };

  componentDidMount() {
    this.getTickets();
  }

  getTickets() {
    axios({
      url: URL + "/tickets/getTickets",
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }).then((response) => {
      this.setState({ CurrentTickets: response.data });
    });
  }

  deleteTicket(id) {
    axios({
      url: URL + "/tickets/deleteTicket",
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        id: id,
      },
    })
      .then((response) => {
        this.props.success(response.data);
      })
      .then(() => {
        this.getTickets();
      })
      .catch((error) => {
        this.props.error(error.response.data);
      });
  }

  render() {
    return (
      <div className="allMovies">
        <div className="table-container" style={{ marginTop: "12px" }}>
          <div className="title">
            <LocalActivityIcon />
            <div className="text">Tickets</div>
          </div>
          <div className="table">
            <table>
              <tr>
                <th>Movie Name</th>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>Time</th>
                <th style={{ textAlign: "center" }}>Seat</th>
                <th style={{ textAlign: "center" }}>Buy Merch</th>
                <th style={{ textAlign: "center" }}>Return</th>
                <th style={{ textAlign: "center" }}>Download</th>
              </tr>
              {this.state.CurrentTickets.map((ticket) => (
                <tr>
                  <td>{ticket.name}</td>
                  <td style={{ textAlign: "center" }}>
                    {new Date(ticket.date).getDate() +
                      "/" +
                      (new Date(ticket.date).getMonth() + 1) +
                      "/" +
                      new Date(ticket.date).getFullYear()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {new Date(ticket.date).getHours() +
                      ":" +
                      new Date(ticket.date).getMinutes()}
                  </td>
                  <td style={{ textAlign: "center" }}>{ticket.seat}</td>

                  <td style={{ textAlign: "center" }}>
                    <button
                      onClick={() => {
                        // window.location.href="/merch?movie_id";
                      }}
                    >
                      <StorefrontIcon style={{ fill: "#f37757" }} />
                    </button>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      onClick={() => {
                        this.deleteTicket(ticket.id);
                      }}
                    >
                      <DeleteForeverIcon style={{ fill: "#f37757" }} />
                    </button>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      onClick={() =>
                        (window.location.href = "/ticket?id=" + ticket.id)
                      }
                    >
                      <DownloadIcon style={{ fill: "#f37757" }} />
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

export default CurrentTickets;
