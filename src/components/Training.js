import React, { Component } from "react";
import "./Training.css";

export default class Training extends Component {
  render() {
    const addToDataWHITE = this.props.addToDataWHITE;
    const addToDataBLACK = this.props.addToDataBLACK;
    const data = this.props.data;
    const counter = this.props.counter;

    return (
      <div>
        <div
          className="trainingBox"
          onClick={addToDataWHITE}
          style={{
            backgroundColor: data[counter]
          }}
        >
          <p className="trainingTextB">Which do you see better?</p>
        </div>
        <div
          className="trainingBox"
          onClick={addToDataBLACK}
          style={{
            backgroundColor: data[counter]
          }}
        >
          <p className="trainingTextW">Which do you see better?</p>
        </div>
      </div>
    );
  }
}
