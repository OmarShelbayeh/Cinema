import axios from "axios";
import React, { Component } from "react";

//services
import URL from "../../Services/URL";

//Material UI
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Backdrop, Fade, Modal } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

class CurrentTickets extends Component {
  state = {
    CurrentTickets: [],

    deleteTicketId: null,
    openConfirmation: false,
  };

  componentDidMount() {
    this.getTickets();
  }

  getTickets(order) {
    axios({
      url: URL + "/tickets/getTickets",
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: { order: order },
    }).then((response) => {
      this.setState({ CurrentTickets: response.data });
    });
    if (order) {
      this.setState({ active: order });
    } else {
      this.setState({ active: "date" });
    }
  }

  deleteTicket() {
    axios({
      url: URL + "/tickets/deleteTicket",
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        id: this.state.deleteTicketId,
      },
    })
      .then((response) => {
        this.props.success(response.data);
      })
      .then(() => {
        this.getTickets();
        this.setState({ openConfirmation: false });
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
                <th>
                  <a
                    onClick={() => {
                      this.getTickets("movieName");
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
                      this.getTickets();
                    }}
                    className={this.state.active === "date" ? "active" : ""}
                  >
                    Date +
                  </a>
                </th>
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
                        window.location.href =
                          "/merch?ticket_id=" +
                          ticket.id +
                          "&movie=" +
                          ticket.name;
                      }}
                    >
                      <StorefrontIcon style={{ fill: "#f37757" }} />
                    </button>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      onClick={() => {
                        this.setState({
                          deleteTicketId: ticket.id,
                          openConfirmation: true,
                        });
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
                  Are you sure you want to return this ticket?
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
                  You will no longer have a ticket to this movie if you return
                  this ticket.
                </p>
              </div>
              <div className="newMovie">
                <button
                  className="button"
                  onClick={() => {
                    this.deleteTicket();
                  }}
                >
                  Return ticket
                </button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default CurrentTickets;
