import React, { Component } from "react";
import axios from "axios";

//Services
import URL from "../../Services/URL";

class Merch extends Component {
  componentDidMount() {
    this.getParams();
  }

  getParams = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const ticket_id = queryParams.get("ticket_id");
    await this.setState({
      ticket_id: ticket_id,
    });
    this.getProducts();
  };

  getProducts() {
    axios({
      url: URL + "/products/movieProducts",
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        ticket_id: this.state.ticket_id,
      },
    })
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        this.props.error(error.response.data);
      });
  }

  render() {
    return <div></div>;
  }
}

export default Merch;
