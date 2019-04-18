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
    this.handleUpdate = this.handleUpdate.bind(this);
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

  handleUpdate(event) {
    alert('Você acaba de fazer porra nenhuma, parabéns');
  }

  handleSave(event) {
    let code = document.querySelector('#code').value;
    let file = '';

    const download = (filename, text) => {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }

    if (this.state.filename === '') {
      file = 'example.js';
    } else file = this.state.filename + '.js'

    download(file, code);
  }

  handleRun(event) {
    let code = document.querySelector('#code').value;
    let consoleElement = document.querySelector('#console');
    window.console.log = (...args) => {
      args.forEach((arg) => {
        consoleElement.value += '> ' + arg + '\r\n';
      });
    }
    consoleElement.value = '';
    eval(code);
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
        <a class="secmenu" id="Update" onClick={this.handleUpdate} style={{ display: this.state.status }}>Update</a>
        <a class="secmenu" id="Run" onClick={this.handleRun} style={{ display: this.state.status }}>Run</a>
        <a class="secmenu" id="Save" onClick={this.handleSave} style={{ display: this.state.status }}>Save</a>
      </nav>
    )
  }
}

class CodeField extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      ctrldown: false,
    }
  }

  handleScroll(event) {
    
  }
  
  handleChange(event) {
    let code = document.querySelector('#code').value;
    let lines = code.split(/\r*\n/);
    let lineCounter = '';

    for (let i = 1; i < lines.length; i++) {
      lineCounter += i + '\r\n'
    }

    document.querySelector('#line-counter').value = lineCounter
  }

  handleKeyDown(event) {
    let keycode = event.keyCode;
    let code = document.querySelector('#code');
    let runButton = document.querySelector('#Run');
    let saveButton = document.querySelector('#Save');
    let updateButton = document.querySelector('#Update');

    if (keycode === 9) {
      event.preventDefault();
      code.value += '  ';
    }
    if (keycode === 17) {
      this.setState({
        ctrldown: true,
      })
    }
    if (keycode === 13 && this.state.ctrldown === true) {
      runButton.click();
    }
    if (keycode === 83 && this.state.ctrldown === true) {
      event.preventDefault();
      saveButton.click();
    }
    if (keycode === 85 && this.state.ctrldown === true) {
      event.preventDefault();
      updateButton.click();
    }
  }

  handleKeyUp(event) {
    let keycode = event.keyCode
    if (keycode === 17) {
      this.setState({
        ctrldown: false,
      })
    }
  }

  render() {
    return (
      <div id="code-container">
        <textarea cols="1" rows="1" id="line-counter" disabled="true"></textarea>
        <textarea cols="40" rows="5" id="code" onChange = {this.handleChange} onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp} onScroll={this.handleScroll}>></textarea>
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