import React, { Component } from 'react';
import { Layout, Row, Col, Button, Icon } from 'antd';
import Video from 'twilio-video';
import io from 'socket.io-client';
import './Media.css';

const { Header, Content } = Layout;

class Media extends Component {
  state = {
    room: undefined,
  };

  componentDidMount() {
    const socket = io(process.env.REACT_APP_SERVER_BASE);
    socket.on('token', ({ token, room: name }) => {
      Video.connect(token, { name })
        .then((room) => {
          console.log('Successfully connected to room!', room);
          this.setState({ room });
        }, console.error);
    });
  }

  componentWillUnmount() {
    if (this.state.room) {
      this.state.room.disconnect();
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={12} offset={6}>
            <Header>
              Pet Cam Has Been Started!
            </Header>
            <Content>
              <Row type="flex" justify="center">
                <Col>
                  <Button ghost type="danger">
                    <a href="/home">
                      Stop <Icon type="close-square-o" />
                    </a>
                  </Button>
                </Col>
              </Row>
            </Content>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Media;
