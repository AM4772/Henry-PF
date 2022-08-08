import React, { Component } from "react";
// import firebase from "firebase";

export class Firebase extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  render() {
    return <div>Firebase</div>;
  }
}

export default Firebase;
