import axios from "axios";
import React, { Component } from "react";

//Services
import URL from "../../Services/URL";
import AuthenticationService from "../../Services/AuthenticationService";

//Material UI
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

class AddAdmin extends Component {
  state = {
    allAdmins: [],
    email: null,
    openNewAdmin: false,
    openConfirmation: false,
    deleteAdmin: {
      id: null,
      email: null,
    },
  };

  componentDidMount() {
    this.getAdmins();
  }

  clearState() {
    this.setState({ email: null, openNewAdmin: false });
  }

  getAdmins(order) {
    axios({
      url: URL + "/user/allAdmins",
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        order: order,
      },
    }).then((response) => {
      this.setState({ allAdmins: response.data });
    });
    if (order) {
      this.setState({ active: order });
    } else {
      this.setState({ active: "name" });
    }
  }

  deleteAdmin() {
    axios({
      url: URL + "/user/deleteAdmin",
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        id: this.state.deleteAdmin.id,
        email: this.state.deleteAdmin.email,
      },
    })
      .then((response) => {
        this.setState({
          openConfirmation: false,
          deleteAdmin: {
            id: null,
            email: null,
          },
        });
        this.props.success(response.data);
      })
      .then(() => {
        this.getAdmins();
      })
      .catch((error) => {
        this.props.error(error.response.data);
      });
  }

  disableAccount(id, email) {
    axios({
      url: URL + "/user/disableAccount",
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
        this.props.success(response.data);
      })
      .then(() => {
        this.getAdmins();
      })
      .catch((error) => {
        this.props.error(error.response.data);
      });
  }

  enableAccount(id, email) {
    axios({
      url: URL + "/user/enableAccount",
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
            <SupervisorAccountIcon />
            <div className="text">Admins</div>
          </div>
          <div className="table">
            <table>
              <tr>
                <th>
                  <a
                    onClick={() => {
                      this.getAdmins();
                    }}
                    className={this.state.active === "name" ? "active" : ""}
                  >
                    Name +
                  </a>
                </th>
                <th>
                  <a
                    onClick={() => {
                      this.getAdmins("surname");
                    }}
                    className={this.state.active === "surname" ? "active" : ""}
                  >
                    Surname +
                  </a>
                </th>
                <th>
                  <a
                    onClick={() => {
                      this.getAdmins("email");
                    }}
                    className={this.state.active === "email" ? "active" : ""}
                  >
                    Email +
                  </a>
                </th>
                <th style={{ textAlign: "center" }}>Status</th>
                <th style={{ textAlign: "center" }}>Control</th>
                <th style={{ textAlign: "center" }}>Delete</th>
              </tr>
              {this.state.allAdmins.length > 0
                ? this.state.allAdmins.map((admin) => (
                    <tr>
                      <td>
                        {admin.active ? (
                          admin.disabled ? (
                            <p style={{ color: "red" }}>{admin.name}</p>
                          ) : (
                            admin.name
                          )
                        ) : (
                          <p style={{ color: "red" }}>
                            User not registered yet
                          </p>
                        )}
                      </td>
                      <td>
                        {admin.active ? (
                          admin.disabled ? (
                            <p style={{ color: "red" }}>{admin.surname}</p>
                          ) : (
                            admin.surname
                          )
                        ) : (
                          <p style={{ color: "red" }}></p>
                        )}
                      </td>
                      <td>
                        {admin.disabled || !admin.active ? (
                          <p style={{ color: "red" }}>{admin.email}</p>
                        ) : (
                          admin.email
                        )}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {admin.disabled ? (
                          <p style={{ color: "red" }}>Disabled</p>
                        ) : (
                          "Active"
                        )}
                      </td>
                      {admin.disabled ? (
                        <td style={{ textAlign: "center" }}>
                          <button
                            onClick={() => {
                              this.enableAccount(admin.id, admin.email);
                            }}
                            aria-label
                          >
                            <PlayCircleFilledWhiteIcon
                              style={{ fill: "#f37757" }}
                            />
                          </button>
                        </td>
                      ) : (
                        <td style={{ textAlign: "center" }}>
                          <button
                            onClick={() => {
                              this.disableAccount(admin.id, admin.email);
                            }}
                          >
                            <PauseCircleFilledIcon
                              style={{ fill: "#f37757" }}
                            />
                          </button>
                        </td>
                      )}

                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => {
                            this.setState({
                              openConfirmation: true,
                              deleteAdmin: { id: admin.id, email: admin.email },
                            });
                          }}
                        >
                          <DeleteForeverIcon style={{ fill: "#f37757" }} />
                        </button>
                      </td>
                    </tr>
                  ))
                : ""}
            </table>
          </div>
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
                  Are you sure you want to delete this account?
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
                  By deleting this account the account holder will no longer be
                  an admin.
                </p>
              </div>
              <div className="newMovie">
                <button
                  className="button"
                  onClick={() => {
                    this.deleteAdmin();
                  }}
                >
                  Delete Admin
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
