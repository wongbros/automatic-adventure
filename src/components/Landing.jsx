import React from 'react';
import { Layout, Row, Col, Button, Icon } from 'antd';
import './Landing.css';

const { Header } = Layout;

const Landing = () => (
  <div>
    <Header>
      <Row type="flex" justify="space-between">
        <Col span={4}>
          Landing
        </Col>
        <Col span={4} offset={12}>
          <Button>
            <a href={`${process.env.REACT_APP_SERVER_BASE}/login`}>Sign in with Google <Icon type="google" /></a>
          </Button>
        </Col>
      </Row>
    </Header>
  </div>
);

export default Landing;
