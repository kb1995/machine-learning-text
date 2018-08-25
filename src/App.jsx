import React, { Component } from "react";
import "./App.css";
import brain from "brain.js";
import Training from "./components/Training";
import AfterTraining from "./components/aftertraining";
import { hot } from "react-hot-loader";

const network = new brain.NeuralNetwork();

const script_intro = [
  <div>
    The goal is to teach the machine to automatically adjust the color of the
    text on a given background.
  </div>,
  <div>
    <p>For Example:</p>
    <div className="example-box">
      <p style={{ fontWeight: "bold", fontSize: "1em", color: "white" }}>
        This is bad
      </p>
    </div>
    <div className="example-box">
      <p style={{ fontWeight: "bold", fontSize: "1em", color: "black" }}>
        This is better
      </p>
    </div>
  </div>,
  <div>
    <p>Let's begin by training some data.</p>
    <p>Remember, the machine will be just as good as you make it.</p>
  </div>,
  <div>
    <p>Click on the rectangle with the better visible text.</p>
    <p>
      Usually 6-7 examples are enough, but try as many or as few as you want.
    </p>
  </div>
];

// create random colors for the training
const colorData = [
  "#000000",
  "#ffffff",
  "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6),
  "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6),
  "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6),
  "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6),
  "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6),
  "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6),
  "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6),
  "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6),
  "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6),
  "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6),
  "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6),
  "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6),
  "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6),
  "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6),
  "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6),
  "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6),
  "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6),
  "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6)
];

class App extends Component {
  state = {
    data: [],
    color: "#ffffff",
    rgb: "",
    slide_intro: false,
    counter: 0,
    counter_training: 0,
    slide_before_training: false
  };

  // convert hex into rgb
  getRgb = hex => {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: Math.round(parseInt(result[1], 16) / 2.55) / 100,
          g: Math.round(parseInt(result[2], 16) / 2.55) / 100,
          b: Math.round(parseInt(result[3], 16) / 2.55) / 100
        }
      : null;
  };

  // adding data to the state, which would be used by brain.js once the training is completed
  addToDataBLACK = () => {
    const rgb = this.getRgb(colorData[this.state.counter_training]);
    const element = { input: rgb, output: { dark: 1 } };
    this.setState(prevState => ({
      data: prevState.data.concat([element]),
      counter_training: this.state.counter_training + 1
    }));
  };

  addToDataWHITE = () => {
    const rgb = this.getRgb(colorData[this.state.counter_training]);
    const element = { input: rgb, output: { light: 1 } };
    this.setState(prevState => ({
      data: prevState.data.concat([element]),
      counter_training: this.state.counter_training + 1
    }));
  };

  // handles the end of training scenarios -> button or colorData is exhausted
  // actual training of the data with brain.js is done
  endOfTraining = () => {
    if (this.state.data.length > 0) {
      this.setState({
        slide_before_training: true
      });
      network.train(this.state.data);
    }
  };

  EndOfArrayExamples = () => {
    network.train(this.state.data);
  };

  handleReset = () => {
    this.setState({
      data: [],
      color: "#ffffff",
      rgb: "",
      counter_training: 0,
      slide_before_training: false
    });
  };

  // handles the changes for the color picker
  handleChange = e => {
    const rgb = this.getRgb(e.hex);
    this.setState({
      color: e.hex,
      rgb: rgb
    });
  };

  render() {
    const result = brain.likely(this.state.rgb, network);
    // intro
    if (this.state.counter !== script_intro.length) {
      return (
        <React.Fragment>
        <div
          className="App"
          onClick={() => this.setState({ counter: this.state.counter + 1 })}
        >
          {script_intro[this.state.counter]}
        </div>
        <div className="branding"><p>Created by <a href="https://twitter.com/kris_bogdanov" target="no_blank">Kris Bogdanov</a></p></div>
        </React.Fragment>
      );
    }
    // training session
    if (
      this.state.slide_before_training === false &&
      this.state.counter_training !== colorData.length
    ) {
      return (
        <React.Fragment>
          <div className="App">
            <Training
              color={this.state.color}
              addToDataWHITE={this.addToDataWHITE}
              addToDataBLACK={this.addToDataBLACK}
              counter={this.state.counter_training}
              data={colorData}
            />
            <div>
              <button className="trained-enough btn btn-primary" onClick={this.endOfTraining}>
                Enough training!
              </button>
            </div>
          </div>
          <div className="branding"><p>Created by <a href="https://twitter.com/kris_bogdanov" target="no_blank">Kris Bogdanov</a></p></div>

        </React.Fragment>
      );
    } else {
      this.EndOfArrayExamples();
    }
    // after training
    return (
      <React.Fragment>
        <div className="App">
          <AfterTraining
            color={this.state.color}
            handleChange={this.handleChange}
            result={result}
            handleReset={this.handleReset}
          />
        </div>
        <div className="branding"><p>Created by <a href="https://twitter.com/kris_bogdanov" target="no_blank">Kris Bogdanov</a></p></div>
          
      </React.Fragment>
    );
  }
}

export default hot(module)(App);
