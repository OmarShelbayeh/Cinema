import React, { Component } from "react";
import axios from "axios";

//COmponents
import Header from "../../Components/General/Header";

class Shops extends Component {
  render() {
    return (
      <div>
        <Header shops />
        <div className="dashboard">
          <div className="row">
            <div className="column"></div>
            <div className="column"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Shops;
