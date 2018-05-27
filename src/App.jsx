import React, { Component } from 'react';
import Video from 'twilio-video';
import './App.css';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzM1YWQ2YjA0NTA1NmQwOGI0MDI2ZmYyNTBlZjk1ODliLTE1Mjc0NTYxNzkiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJCcmFuZG9uIiwidmlkZW8iOnsicm9vbSI6IlJvb20gMSJ9fSwiaWF0IjoxNTI3NDU2MTc5LCJleHAiOjE1Mjc0NTk3NzksImlzcyI6IlNLMzVhZDZiMDQ1MDU2ZDA4YjQwMjZmZjI1MGVmOTU4OWIiLCJzdWIiOiJBQzJjYjE3Mzc5Y2QxMGI4NDE3ODExMzUxOTI4YmQzOTRiIn0.7pH7ZqSfaol8Mc4HAptG8P2BLznIbvW0yKmDfGT-EkA';

class App extends Component {
  componentDidMount() {
    Video.connect(token, { name: 'Room 1' })
      .then((room) => {
        console.log({ room });

        console.log(room.participants);

        room.on('trackAdded', (track, participant) => {
          console.log({ track });
          console.log({ participant });
        });
      }, console.error);
  }

  render() {
    return (
      <div>Hello world</div>
    );
  }
}

export default App;
