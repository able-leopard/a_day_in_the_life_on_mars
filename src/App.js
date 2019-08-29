import React, { Component } from 'react';
import './App.css';
import MarsGenerator from './MarsGenerator'


class App extends Component {
  
  render() {
    return (
      
      <div className="stars">
        <link href="https://fonts.googleapis.com/css?family=Oswald&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css?family=Oswald&display=swap" rel="stylesheet"/>
        <nav className="nav-bar">
          <h1 className="top-title">A Day In The Life </h1>
          <img className="mars-image" src={require("./Photos/mars.jpg")} alt="mars"/>
          <h1 className="top-title">n Mars</h1>
        </nav>
        <br/>
        <MarsGenerator/>
      </div>
    );
  }
}

export default App;
