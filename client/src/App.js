import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import jQuery from 'jquery';
import $ from 'jquery';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: '',
    };
  };

  handleEdit(event) {
    this.setState({
      filename: document.querySelector('#project-name').value
    });
  }

  handleUpdate(event) { }

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
    try {
      eval(code);
    }
    catch (err) {
      consoleElement.value = '> ' + err.message;
    }
  }

  render() {
    return (
      <nav class="navbar">
        <input type="text" id="project-name"
          onChange={this.handleEdit.bind(this)}
          placeholder="[PROJECT_NAME]" />
        <div id="blank-space"></div>
        <div class="navmenu">
          <a class="secmenu" id="update"
            onClick={this.handleUpdate.bind(this)}
            style={{ display: this.state.status }}>Update</a>

          <a class="secmenu" id="run"
            onClick={this.handleRun.bind(this)}
            style={{ display: this.state.status }}>Run</a>

          <a class="secmenu" id="save"
            onClick={this.handleSave.bind(this)}
            style={{ display: this.state.status }}>Save</a>
        </div>
      </nav>
    )
  }
}

class CodeField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ctrldown: false,
      scriptString: '',
    }
  }

  handleScroll(event) {
    let code = document.querySelector('#code');
    let lineNumbers = document.querySelector('#line-counter');

    lineNumbers.scrollTop = code.scrollTop
  }

  handleChange(event) {
    let code = document.querySelector('#code').value;
    let lines = code.split(/\r*\n/);
    let lineCounter = '';

    lines.forEach((line, i) => {
      lineCounter += i + 1 + '\r\n'
    })

    document.querySelector('#line-counter').value = lineCounter
  }

  handleKeyDown(event) {
    let keycode = event.keyCode;
    let code = document.querySelector('#code');
    let runButton = document.querySelector('#run');
    let saveButton = document.querySelector('#save');
    let updateButton = document.querySelector('#update');

    if (event.keyCode === 9) { 
      event.preventDefault();
      let start = code.selectionStart;
      let end = code.selectionEnd;
      code.value = code.value.substr(0, start) + "  " + code.value.substr(end);
      code.selectionStart = code.selectionEnd = start + 2;  
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
        <textarea cols="1" rows="1"
          id="line-counter"
          disabled="true"></textarea>
        <textarea cols="40" rows="5"
          id="code"
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          onKeyUp={this.handleKeyUp.bind(this)}
          onScroll={this.handleScroll.bind(this)}></textarea>
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
      <textarea cols="40" rows="5"
        id="console"
        disabled="true"></textarea>
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