import React, { Component } from 'react';
import Whitelist from './Whitelist';
import Details from './Details';
import { getUserData, saveUserData } from '../service';

class Settings extends Component {
  state = {
    email: '',
    phoneNumbers: [],
    petName: '',
    roomName: '',
  };

  async componentDidMount() {
    await this.getUserData();
  }

  getUserData = async () => {
    const userData = await getUserData();
    console.log(userData);
    const { email } = userData;
    const petName = userData.pet_name;
    const roomName = userData.room;
    const phoneNumbers = userData.eligible_phone_numbers;
    this.setState({
      email,
      phoneNumbers,
      petName,
      roomName,
    });
    // console.log('state: ', this.state);
  }

  updateUserData = (stateName, value) => {
    this.setState({ [stateName]: value });
  }

  saveUserData = async () => {
    await saveUserData({
      email: this.state.email,
      petName: this.state.petName,
      room: this.state.roomName,
      eligiblePhoneNumbers: this.state.phoneNumbers,
    });
    // re-fetch
    this.getUserData();
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <div>
          <h3>Settings</h3>
          <Details
            update={this.updateUserData}
            email={this.state.email}
            petName={this.state.petName}
            roomName={this.state.roomName}
          />
          <Whitelist
            update={this.updateUserData}
            email={this.state.email}
            phoneNumbers={this.state.phoneNumbers}
          />
          <button onClick={this.saveUserData}>Save</button>
        </div>
      </div>
    );
  }
}

export default Settings;
