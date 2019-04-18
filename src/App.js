import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Navbar extends Component {
  constructor(props){
    super(props)
  }

  render () {
    return(
      <nav class="navbar">  
        <a id="project-name">[PROJECT_NAME]</a>
        <a class="menu">
          <div></div>
          <div></div>
          <div></div>
        </a>
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
        <textarea cols="40" rows = "5" id="console" disabled="true">Hello</textarea>
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
