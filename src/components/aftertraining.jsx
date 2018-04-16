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
          </p>
        </div>
        <div />
        <div>
          <button onClick={handleReset} className="reset btn btn-primary">
            Reset
          </button>
        </div>
      </div>
    );
  }
}
