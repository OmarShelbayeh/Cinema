import React, { Component } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

//css
import "./css/Ticket.css";

//Services
import URL from "../../Services/URL";
import AuthenticationService from "../../Services/AuthenticationService";

class Ticket extends Component {
  state = {
    ticket: null,
    id: null,
  };

  componentDidMount() {
    this.getParams();
  }

  getParams = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");

    await this.setState({
      id: id,
    });
    this.getTicket();
  };

  getTicket() {
    axios({
      url: URL + "/tickets/ticketInfo",
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        id: this.state.id,
      },
    }).then((response) => {
      this.setState({ ticket: response.data[0] });
    });
  }

  render() {
    let printDocument = () => {
      const input = document.getElementById("ticket");
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "mm", "a4");
        var width = pdf.internal.pageSize.getWidth();
        pdf.addImage(imgData, "JPEG", 0, 0, width, 150);
        // pdf.output("dataurlnewwindow");
        pdf.save("ticket.pdf");
      });
    };
    if (!AuthenticationService.isUserLoggedIn()) {
      window.location.href = "/login";
    }
    if (AuthenticationService.getRole() !== "USER") {
      window.location.href = "/dashboard";
    }
    return (
      <div>
        {this.state.ticket ? (
          <div className="ticket">
            <div className="container">
              <div className="row">
                <table id="ticket">
                  <tr>
                    <th>Movie Name</th>
                    <td>{this.state.ticket.name}</td>
                    <th>Ticket nr.</th>
                    <td>{this.state.ticket.id}</td>
                  </tr>
                  <tr>
                    <th>Director</th>
                    <td>{this.state.ticket.director}</td>
                    <th>Owner</th>
                    <td>{this.state.ticket.owner}</td>
                  </tr>
                  <tr>
                    <th>Stage name</th>
                    <td>{this.state.ticket.stage_name}</td>
                    <th>Seat nr.</th>
                    <td>{this.state.ticket.seat_id}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>
                      {new Date(this.state.ticket.showing_at).getDate() +
                        "/" +
                        (new Date(this.state.ticket.showing_at).getMonth() + 1) +
                        "/" +
                        new Date(this.state.ticket.showing_at).getFullYear()}
                    </td>
                    <th>Time</th>
                    <td>
                      {new Date(this.state.ticket.showing_at).getHours() +
                        ":" +
                        new Date(this.state.ticket.showing_at).getMinutes()}
                    </td>
                  </tr>
                </table>
                <button
                  className="button"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Dashboard
                </button>
                <button className="button" onClick={() => printDocument()}>
                  Download
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Ticket;
