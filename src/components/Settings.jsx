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
    console.log('userData', userData);
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

  saveUserData = async ({ petName, roomName, phoneNumbers }) => {
    await saveUserData({
      petName,
      room: roomName,
      email: this.state.email,
      eligiblePhoneNumbers: phoneNumbers,
    });
    // re-fetch
    this.getUserData();
  }

  render() {
    return (
      <div>
        <div>
          <h3>Settings</h3>
          <Details
            saveUserData={this.saveUserData}
            email={this.state.email}
            petName={this.state.petName}
            roomName={this.state.roomName}
          />
          <Whitelist
            update={this.updateUserData}
            email={this.state.email}
            phoneNumbers={this.state.phoneNumbers}
          />
        </div>
      </div>
    );
  }
}

export default Settings;
