import React from 'react';
import './Landing.css';

const Landing = () => (
  <div>
    <h1>Landing</h1>
    <div>
      <a href={`${process.env.REACT_APP_SERVER_BASE}/login`}>Login</a>
    </div>
  </div>
);

export default Landing;
