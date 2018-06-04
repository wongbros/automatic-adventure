import React, { Component } from 'react';
import Whitelist from './Whitelist';
import Details from './Details';

class Settings extends Component {
  state = {};

  render() {
    return (
      <div>
        <div>
          <h3>Settings</h3>
          <Details />
          <Whitelist />
        </div>
      </div>
    );
  }
}

export default Settings;
