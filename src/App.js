/* eslint-disable jsx-a11y/html-has-lang */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet'; // this is for changing the tab title: https://github.com/nfl/react-helmet

import MarsGenerator from './Components/MarsGenerator';
import IMAGES from '../src/Assets/imageFiles'

import './App.css';
import './Small.css';

const TITLE = 'A Day In The Life On Mars';

class App extends Component {
  render() {
    return (
      <div className="stars">
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <nav className="nav-bar">
          <h1 className="top-title">A Day In The Life </h1>
          <img
            className="mars-image"
            // eslint-disable-next-line global-require
            src={require('../src/Assets/'+IMAGES.mars)}
            alt="mars"
          />
          <h1 className="top-title">n Mars</h1>
        </nav>
        <br />
        <MarsGenerator />
      </div>
    );
  }
}


export default App;
