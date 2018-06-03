import React, { Component } from 'react';
import Settings from './Settings';

class Home extends Component {
  state = {};

  render() {
    return (
      <div>
        <h1>Home</h1>
        <Settings />
        <a href="/media">Start Camera</a>
      </div>
    );
  }
}

export default Home;
