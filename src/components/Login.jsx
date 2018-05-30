import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div>
        <a href={`${process.env.REACT_APP_SERVER_BASE}/login`}>Login</a>
      </div>
    );
  }
}

export default Login;
