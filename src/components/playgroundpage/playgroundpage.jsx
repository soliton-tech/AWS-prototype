import React, { Component } from "react";
import "./playgroundpage.css";
import "../../Global.css";

class PlayGroundPage extends Component {
  state = {
    quickSightLink: "",
  };

  componentDidMount() {
    this.getSession();
  }

  fetchUrl = () => {
    let theUrl = "https://olocbpuxu5.execute-api.us-east-1.amazonaws.com//get-qs-embed-url";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send();
    var resp = xmlHttp.responseText;
    console.log(resp);
    return resp;
  };

  getSession = () => {
    let quickSightLink = this.fetchUrl();
    this.setState({ quickSightLink });
  };

  render() {
    return (
      <div className="root-container">
        <iframe className="playground-container" src={this.state.quickSightLink} height="100%" width="100%"></iframe>
      </div>
    );
  }
}

export default PlayGroundPage;
