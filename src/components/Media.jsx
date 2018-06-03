import React, { Component } from 'react';
import Video from 'twilio-video';
import io from 'socket.io-client';
import './Media.css';

class Media extends Component {
  componentDidMount() {
    const socket = io(process.env.REACT_APP_SERVER_BASE);
    socket.on('token', (token) => {
      console.log('token', token);
      Video.connect(token, { name: 'Room 1' })
        .then((room) => {
          console.log('Successfully connected to room!', room);
        }, console.error);
    });
  }

  render() {
    return (
      <div>Pet cam</div>
    );
  }
}

export default Media;
