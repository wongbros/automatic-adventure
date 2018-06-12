import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Settings from './Settings';

class Home extends Component {
  state = {};

  render() {
    return (
      <div>
        <Row>
          <Col span={12} offset={6}>
            <h1>Home</h1>
            <a href={`${process.env.REACT_APP_SERVER_BASE}/logout`}>Logout</a>
            <Settings />
            <a href="/media">Start Camera</a>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
