import React, { Component } from 'react';
import { Layout, Row, Col, Collapse, Button, Icon } from 'antd';
import Settings from './Settings';
import './Home.css';

const { Header, Content } = Layout;
const { Panel } = Collapse;

class Home extends Component {
  state = {};

  render() {
    return (
      <div>
        <Row>
          <Col span={12} offset={6}>
            <Header>
              <Row>
                <Col span={18}>
                  Home
                </Col>
                <Col span={6}>
                  <Button ghost type="danger">
                    <a href={`${process.env.REACT_APP_SERVER_BASE}/logout`}>Logout</a>
                  </Button>
                </Col>
              </Row>
            </Header>
            <Content>
              <Collapse>
                <Panel header="Settings">
                  <Settings />
                </Panel>
              </Collapse>
            </Content>
            <Row type="flex" justify="center">
              <Col>
                <Button>
                  <a href="/media">Start Camera <Icon type="camera-o" /></a>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
