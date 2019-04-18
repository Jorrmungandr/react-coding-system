import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.handleRun = this.handleRun.bind(this);
    this.state = {
      status: "none"
    };
  };

  handleRun(event) {
    let code = document.querySelector('#code').value;
    let consoleElement = document.querySelector('#console').value;
    let func = new Function(code)

    consoleElement = func();
  }

  handleMouseClick(event) {
    if (this.state.status === "flex") {
      this.setState({
        status: "none",
      });
    } else {
      this.setState({
        status: "flex",
      });
    }
  }

  render() {
    return (
      <nav class="navbar">
        <a id="project-name">[PROJECT_NAME]</a>
        <a class="menu" onClick={this.handleMouseClick}>
          <div></div>
          <div></div>
          <div></div>
        </a>
        <a class="secmenu" id="Update" style={{ display: this.state.status, backgroundColor: "#e50000" }}>Update</a>
        <a class="secmenu" id="Run" onClick={this.handleRun} style={{ display: this.state.status, backgroundColor: "#007F00" }}>Run</a>
        <a class="secmenu" id="Save" style={{ display: this.state.status, backgroundColor: "#3232FF" }}>Save</a>
      </nav>
    )
  }
}

class CodeField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="code-container">
        <textarea cols="40" rows="5" id="code"></textarea>
      </div>
    )
  }
}

class Console extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <textarea cols="40" rows="5" id="console" disabled="true"></textarea>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <CodeField />
        <Console />
      </div>
    );
  }
}

export default App;
