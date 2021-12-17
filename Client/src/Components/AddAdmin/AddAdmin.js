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

class AddAdmin extends Component {
  state = {
    allAdmins: [],
    email: null,
    openNewAdmin: false,
  };

  componentDidMount() {
    this.getAdmins();
  }

  clearState() {
    this.setState({ email: null, openNewAdmin: false });
  }

  getAdmins() {
    axios({
      url: URL + "/user/allAdmins",
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }).then((response) => {
      this.setState({ allAdmins: response.data });
    });
  }

  deleteAdmin(id, email) {
    axios({
      url: URL + "/user/deleteAdmin",
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        id: id,
        email: email,
      },
    })
      .then((response) => {
        console.log(response);
        this.props.success(response.data);
      })
      .then(() => {
        this.getAdmins();
      })
      .catch((error) => {
        this.props.error(error.response.data);
      });
  }

  addNewAdmin() {
    if (this.state.email) {
      axios({
        url: URL + "/user/addAdmin",
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
        },
        data: {
          email: this.state.email,
        },
      })
        .then((response) => {
          this.props.success(response.data);
        })
        .then(() => {
          this.clearState();
          this.getAdmins();
        })
        .catch((error) => {
          this.props.error(error.response.data);
        });
    } else {
      this.props.warning("Missing Data");
    }
  }

  render() {
    return (
      <div className="allMovies">
        <div className="table-container">
          <div className="title">
            <TheatersIcon />
            <div className="text">Admins</div>
          </div>
          <table>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Status</th>
              <th style={{ textAlign: "center" }}>Delete</th>
            </tr>
            {this.state.allAdmins.length > 0
              ? this.state.allAdmins.map((admin) => (
                  <tr>
                    <td>
                      {admin.active
                        ? admin.name + " " + admin.surname
                        : "User not registered yet"}
                    </td>
                    <td>{admin.email}</td>
                    <td>{admin.active ? "Active" : "Not active"}</td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        onClick={() => {
                          this.deleteAdmin(admin.id, admin.email);
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
            onClick={() => this.setState({ openNewAdmin: true })}
          >
            Add new admin
          </button>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.openNewAdmin}
          onClose={() => this.setState({ openNewAdmin: false })}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.openNewAdmin}>
            <div className="card-popup">
              <div className="close-popup-button">
                <p className="titles-text">Add new admin</p>
                <button
                  type="button"
                  onClick={() => this.setState({ openNewAdmin: false })}
                >
                  <CancelIcon style={{ fill: "#f37757" }} />
                </button>
              </div>
              <div className="newMovie">
                <div className="element TextField-radius">
                  <TextField
                    type="text"
                    name="email"
                    onChange={(event) =>
                      this.setState({ email: event.target.value })
                    }
                    label="New Admin's Email"
                    variant="outlined"
                    fullWidth
                  />
                </div>

                <button
                  className="button"
                  onClick={() => {
                    this.addNewAdmin();
                  }}
                >
                  Add new admin
                </button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default AddAdmin;
