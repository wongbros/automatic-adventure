import React, { Component } from 'react';
import Settings from './Settings';

class Home extends Component {
  state = {};

  render() {
    return (
      <div>
        <h1>Home</h1>
        <a href={`${process.env.REACT_APP_SERVER_BASE}/logout`}>Logout</a>
        <Settings />
        <a href="/media">Start Camera</a>
      </div>
    );
  }
}

export default Home;
