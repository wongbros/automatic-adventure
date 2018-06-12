import React, { Component } from 'react';
import { Layout, Row, Col, Collapse } from 'antd';
import Settings from './Settings';
import './Home.css';

const { Header, Content } = Layout;
const { Panel } = Collapse.Panel;

class Home extends Component {
  state = {
    settingsHeader: 'Show Settings',
  };

  toggleSettingsView = () => {
    const settingsHeader = this.state.settingsHeader === 'Show Settings' ? 'Hide Settings' : 'Show Settings';
    this.setState({ settingsHeader });
  }

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
                  <a href={`${process.env.REACT_APP_SERVER_BASE}/logout`}>Logout</a>
                </Col>
              </Row>
            </Header>
            <Content>
              <Collapse defaultActiveKey={['1']}>
                <Panel header={this.state.settingsHeader} key="1" onClick={this.toggleSettingsView}>
                  <Settings />
                </Panel>
              </Collapse>
              <a href="/media">Start Camera</a>
            </Content>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
