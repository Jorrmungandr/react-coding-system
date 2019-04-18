import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.handleRun = this.handleRun.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {
      status: 'none',
      filename: '',
    };
  };

  handleEdit(event) {
    this.setState({
      filename: document.querySelector('#project-name').value
    });
  }

  handleSave(event) {
    let code = document.querySelector('#code').value;

    const download = (filename, text) => {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }

    download(this.state.filename + '.js', code);
  }

  handleRun(event) {
    let code = document.querySelector('#code').value;
    let consoleElement = document.querySelector('#console');
    let func = new Function(code)

    consoleElement.value += '---------' + '\r\n'
    consoleElement.value += 'Running...' + '\r\n';
    consoleElement.value += func() + '\r\n';
    consoleElement.value += 'Finished' + '\r\n';
    consoleElement.value += '---------' + '\r\n'
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
        <input type="text" id="project-name" onChange={this.handleEdit} placeholder="[PROJECT_NAME]" />
        <a class="menu" onClick={this.handleMouseClick}>
          <div></div>
          <div></div>
          <div></div>
        </a>
        <a class="secmenu" id="Update" style={{ display: this.state.status, backgroundColor: "#e50000" }}>Update</a>
        <a class="secmenu" id="Run" onClick={this.handleRun} style={{ display: this.state.status, backgroundColor: "#007F00" }}>Run</a>
        <a class="secmenu" id="Save" onClick={this.handleSave} style={{ display: this.state.status, backgroundColor: "#3232FF" }}>Save</a>
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
