import React, { Component } from 'react';
import Video from 'twilio-video';
import './Media.css';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzM1YWQ2YjA0NTA1NmQwOGI0MDI2ZmYyNTBlZjk1ODliLTE1Mjc1NDgxMDMiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJQZXJzb24gMSIsInZpZGVvIjp7InJvb20iOiJSb29tIDEifX0sImlhdCI6MTUyNzU0ODEwMywiZXhwIjoxNTI3NTUxNzAzLCJpc3MiOiJTSzM1YWQ2YjA0NTA1NmQwOGI0MDI2ZmYyNTBlZjk1ODliIiwic3ViIjoiQUMyY2IxNzM3OWNkMTBiODQxNzgxMTM1MTkyOGJkMzk0YiJ9.MT07gRrtEnu4lZUte3GlBVZkSG66auPpuYdr9cIvNGg';

class Media extends Component {
  componentDidMount() {
    Video.connect(token, { name: 'Room 1' })
      .then((room) => {
        console.log('Successfully connected to room!', room);
      }, console.error);
  }

  render() {
    return (
      <div>Pet cam</div>
    );
  }
}

export default Media;
