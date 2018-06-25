import React from 'react';
import { Layout, Row, Col, Button, Icon } from 'antd';
import './Landing.css';

const { Header, Content } = Layout;

const Landing = () => (
  <div>
    <Row>
      <Col span={12} offset={6}>
        <Header>
          Landing
        </Header>
        <Content>
          <Row type="flex" justify="center">
            <Col>
              <Button ghost type="primary">
                <a href={`${process.env.REACT_APP_SERVER_BASE}/login`}>Sign in with Google <Icon type="google" /></a>
              </Button>
            </Col>
          </Row>
        </Content>
      </Col>
    </Row>
  </div>
);

export default Landing;
