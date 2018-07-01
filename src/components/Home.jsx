import React, { Component } from 'react';
import { Layout, Row, Col, Collapse, Button, Icon } from 'antd';
import Settings from './Settings';
import styles from './Home.css';

const { Header, Content } = Layout;
const { Panel } = Collapse;

class Home extends Component {
  state = {};

  render() {
    return (
      <div>
        <Header>
          <Row type="flex" justify="space-between">
            <Col span={4}>
              Home
            </Col>
            <Col span={4} offset={12}>
              <Button type="danger">
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
        <Row className={styles.buttonPosition} type="flex" justify="center" align="bottom">
          <Col>
            <Button>
              <a href="/media">Start Camera <Icon type="camera-o" /></a>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
