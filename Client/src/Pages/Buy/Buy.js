import axios from "axios";
import React, { Component } from "react";

//Services
import URL from "../../Services/URL";

//Css
import "./css/Buy.css";

//Material UI
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import EventSeatIcon from "@mui/icons-material/EventSeat";

class Buy extends Component {
  state = {
    id: null,
    schedule: null,

    numOfTickets: 1,
    showSeats: false,

    reserved: [],

    error: false,
  };

  componentDidMount() {
    this.getParams();
  }

  handleChange(change, value) {
    switch (change) {
      case "numOfTickets":
        if (
          value < 1 ||
          value > parseInt(this.state.schedule.available_seats)
        ) {
          this.setState({ error: true, numOfTickets: value });
        } else {
          this.setState({ error: false, numOfTickets: value });
        }
        break;
    }
  }

  seatsControl() {
    if (!this.state.error) {
      this.setState({ showSeats: true });
    } else {
      this.props.warning("Missing Data");
    }
  }

  chooseSeats(change, id) {
    let ChosenSeats = this.state.reserved.length > 0 ? this.state.reserved : [];

    switch (change) {
      case "add":
        if (ChosenSeats.length < this.state.numOfTickets) {
          ChosenSeats.push(id);
          this.setState({ reserved: ChosenSeats });
          break;
        } else {
          this.props.warning("You've already chosen all seats");
          break;
        }
      case "remove":
        const index = ChosenSeats.indexOf(id);
        ChosenSeats.splice(index, 1);
        this.setState({ reserved: ChosenSeats });
        break;
    }
  }

  getParams = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    await this.setState({
      id: id,
    });
    this.getSchedule();
  };

  getSchedule() {
    axios({
      url: URL + "/schedules/getInfo",
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        id: this.state.id,
      },
    })
      .then((response) => {
        this.setState({ schedule: response.data[0] });
      })
      .then(() => {
        let seats = [];
        let count = 1;
        for (let i = 0; i < this.state.schedule.rows; i++) {
          seats[i] = [];
          for (let j = 0; j < this.state.schedule.seats_in_row; j++) {
            seats[i][j] = {
              available: !this.state.schedule.seats.includes(count),
              id: count,
            };
            count++;
          }
        }
        this.setState({ seats: seats });
      });
  }

  buyTicket() {
    if (
      !this.state.id ||
      this.state.reserved.length < this.state.numOfTickets
    ) {
      this.props.warning("Missing data");
    } else {
      for (let i = 0; i < this.state.reserved.length; i++) {
        axios({
          url: URL + "/tickets/buyTicket",
          method: "POST",
          headers: {
            authorization: localStorage.getItem("token"),
          },
          data: {
            schedule_id: this.state.id,
            seat_id: this.state.reserved[i],
          },
        })
          .then((response) => {
            this.props.success(response.data);
          })
          .then(() => {
            window.location.href = "/dashboard";
          })
          .catch((error) => {
            this.props.error(error.response.data);
          });
      }
    }
  }

  render() {
    return (
      <div className="buy">
        {this.state.schedule ? (
          this.state.showSeats ? (
            <div className="container">
              <div className="title">
                <div className="text">{this.state.schedule.name}</div>
              </div>
              <div className="subTitle">
                <div className="text">
                  {"Stage Name: " + this.state.schedule.stage_name}
                </div>
              </div>

              {this.state.seats.map((row) => (
                <div className="row" style={{ justifyContent: "center" }}>
                  {row.map(
                    (seat) =>
                      seat.available ? (
                        this.state.reserved.includes(seat.id) ? (
                          <button
                            onClick={() => this.chooseSeats("remove", seat.id)}
                          >
                            <EventSeatIcon style={{ fill: "#BBCEFF" }} />
                          </button>
                        ) : (
                          <button
                            onClick={() => this.chooseSeats("add", seat.id)}
                          >
                            <EventSeatIcon style={{ fill: "#638DFC" }} />
                          </button>
                        )
                      ) : (
                        <button
                          onClick={() => this.props.warning("Seat taken")}
                        >
                          <EventSeatIcon style={{ fill: "#F37757" }} />
                        </button>
                      )

                    // <p>{seat.id}</p>
                  )}
                </div>
              ))}
              <div className="row">
                <button className="button" onClick={() => this.buyTicket()}>
                  Buy
                </button>
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="title">
                <div className="text">{this.state.schedule.name}</div>
              </div>
              <div className="numOfSeats">
                <div className="text">
                  <p className="available">Available Tickets: </p>
                  <p className="num">{this.state.schedule.available_seats}</p>
                </div>
              </div>
              <div className="row">
                <div className="column">
                  <div className="element TextField-radius">
                    <TextField
                      error={this.state.error}
                      label="Amount of tickets"
                      type="number"
                      variant="outlined"
                      defaultValue={1}
                      min={1}
                      max={this.state.schedule.available_seats}
                      onChange={(event) =>
                        this.handleChange("numOfTickets", event.target.value)
                      }
                      fullWidth
                    />
                  </div>
                </div>
                <div className="column">
                  <div className="element">
                    {this.state.error
                      ? "Error"
                      : "Price: $" +
                        this.state.numOfTickets * this.state.schedule.price}
                  </div>
                </div>
              </div>
              <div className="row">
                <button className="button" onClick={() => this.seatsControl()}>
                  Choose seats
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="container">Something went wrong!</div>
        )}
      </div>
    );
  }
}

export default Buy;