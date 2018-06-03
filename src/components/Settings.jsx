import React, { Component } from 'react';
import Whitelist from './Whitelist';

class Settings extends Component {
  state = {};

  render() {
    return (
      <div>
        <div>
          <h3>Settings</h3>
          <Whitelist />
        </div>
      </div>
    );
  }
}

export default Settings;
