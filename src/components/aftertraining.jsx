import React, { Component } from "react";
import { SketchPicker } from "react-color";
import "./aftertraining.css";

export default class AfterTraining extends Component {
  render() {
    const color = this.props.color;
    const handleChange = this.props.handleChange;
    const result = this.props.result;
    const handleReset = this.props.handleReset;

    return (
      <React.Fragment>
        <div className="wrapper">
          <div className="colorPicker">
            <SketchPicker color={color} onChange={handleChange} />
          </div>
          <div
            className="background"
            style={{
              backgroundColor: color
            }}
          >
            <p
              className="text"
              style={{ color: result === "dark" ? "white" : "black" }}
            >
              Can you see me?
              Change the color in the color picker
            </p>
          </div>
        </div>
        <div className = 'button-wrapper'>
          <button onClick={handleReset} className="btn btn-primary">
            Try it again!
          </button>
        </div>
      </React.Fragment>
    );
  }
}
