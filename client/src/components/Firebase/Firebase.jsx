import React, { Component } from "react";
import s from "./Firebase.module.sass";
// import firebase from "firebase";

export class Firebase extends Component {
  constructor() {
    super();
    this.state = {
      uploadValue: 0,
    };
  }
  render() {
    return <div>Firebase</div>;
  }
}

export default Firebase;
