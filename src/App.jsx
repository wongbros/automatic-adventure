import React, { Component } from 'react';
import Video from 'twilio-video';
import './App.css';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzM1YWQ2YjA0NTA1NmQwOGI0MDI2ZmYyNTBlZjk1ODliLTE1Mjc1MjY2NTMiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJQZXJzb24gMSIsInZpZGVvIjp7InJvb20iOiJSb29tIDEifX0sImlhdCI6MTUyNzUyNjY1MywiZXhwIjoxNTI3NTMwMjUzLCJpc3MiOiJTSzM1YWQ2YjA0NTA1NmQwOGI0MDI2ZmYyNTBlZjk1ODliIiwic3ViIjoiQUMyY2IxNzM3OWNkMTBiODQxNzgxMTM1MTkyOGJkMzk0YiJ9.0Wms4q3_v1p1LEOOQ5jdpFepGVLuuNgwhGOKV-S5w3U';

class App extends Component {
  componentDidMount() {
    Video.connect(token, { name: 'Room 1' })
      .then((room) => {
        console.log('Successfully connected to room!', room);
      }, console.error);
  }

  render() {
    return (
      <div>
        <div id="remote-media-div" />
      </div>
    );
  }
}

export default App;
