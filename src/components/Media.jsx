import React, { Component } from 'react';
import Video from 'twilio-video';
import io from 'socket.io-client';
import './Media.css';

class Media extends Component {
  state = {
    room: undefined,
  };

  componentDidMount() {
    const socket = io(process.env.REACT_APP_SERVER_BASE);
    console.log('socket:', socket);
    socket.on('token', (token) => {
      console.log('token:', token);
      Video.connect(token.token, { name: token.room })
        .then((room) => {
          console.log(room);
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
        <h1>Pet cam has been started!</h1>
        <a href="/home">Stop</a>
      </div>
    );
  }
}

export default Media;
