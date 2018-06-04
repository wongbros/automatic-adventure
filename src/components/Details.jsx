import React from 'react';
import { getUserData, saveUserData } from '../service';

class Details extends React.Component {
  state = {
    petName: '',
    roomName: '',
    email: '',
  }

  async componentDidMount() {
    await this.getDetails();
  }

  getDetails = async () => {
    const userData = await getUserData();
    const { email } = userData;
    const petName = userData.pet_name;
    const roomName = userData.room;
    this.setState({ petName, roomName, email });
  }

  update = (stateName, value) => {
    this.setState({ [stateName]: value });
  }

  saveDetails = async () => {
    await saveUserData({
      email: this.state.email,
      petName: this.state.petName,
      room: this.state.roomName,
    });
  }

  render() {
    return (
      <div>
        <div>Pet Name: {this.state.petName}</div>
        <div>Room Name: {this.state.roomName}</div>
        <div>
          <input
            type="text"
            value={this.state.petName}
            onChange={e => this.update('petName', e.target.value)}
            placeholder="Update Pet Name"
          />
        </div>
        <div>
          <input
            type="text"
            value={this.state.roomName}
            onChange={e => this.update('roomName', e.target.value)}
            placeholder="Update Room Name"
          />
        </div>
        <button onClick={this.saveDetails}>Save</button>
      </div>
    );
  }
}

export default Details;
