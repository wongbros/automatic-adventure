import React, { Component } from 'react';
import Video from 'twilio-video';
import './App.css';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzM1YWQ2YjA0NTA1NmQwOGI0MDI2ZmYyNTBlZjk1ODliLTE1Mjc0NTk2NjQiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJQZXJzb24gMSIsInZpZGVvIjp7InJvb20iOiJSb29tIDEifX0sImlhdCI6MTUyNzQ1OTY2NCwiZXhwIjoxNTI3NDYzMjY0LCJpc3MiOiJTSzM1YWQ2YjA0NTA1NmQwOGI0MDI2ZmYyNTBlZjk1ODliIiwic3ViIjoiQUMyY2IxNzM3OWNkMTBiODQxNzgxMTM1MTkyOGJkMzk0YiJ9.mcb5x1iu0LEjNnseFTXapNhrLV-ufRyspOBeOUBrWDs';

class App extends Component {
  componentDidMount() {
    Video.connect(token, { name: 'Room 1' })
      .then((room) => {
        console.log({ room });

        console.log(room.participants);

        room.on('participantConnected', (participant) => {
          console.log(`Participant ${participant.identity} connected`);

          participant.tracks.forEach((track) => {
            console.log('each track', track);
            document.getElementById('remote-media-div').appendChild(track.attach());
          });

          participant.on('trackAdded', (track) => {
            console.log('added track', track);
            document.getElementById('remote-media-div').appendChild(track.attach());
          });
        });
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
