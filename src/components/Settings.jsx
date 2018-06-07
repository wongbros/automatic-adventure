import React, { Component } from 'react';
import Whitelist from './Whitelist';
import Details from './Details';
import { getUserData, saveUserData } from '../service';
import './Settings.css';

class Settings extends Component {
  state = {
    email: '',
    phoneNumbers: [],
    petName: '',
    roomName: '',
    isShowing: false,
    settingsHeader: 'Show Settings',
  };

  async componentDidMount() {
    await this.getUserData();
  }

  getUserData = async () => {
    const userData = await getUserData();
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

  toggleSettingsView = () => {
    const settingsHeader = !this.state.isShowing ? 'Hide Settings' : 'Show Settings';
    this.setState({ settingsHeader, isShowing: !this.state.isShowing });
  }

  render() {
    return (
      <div>
        <div>
          <h3>
            <div
              onClick={this.toggleSettingsView}
              onKeyPress={this.toggleSettingsView}
              tabIndex={0}
              role="button"
            >
              {this.state.settingsHeader}
            </div>
          </h3>
          {this.state.isShowing &&
            <div>
              <Details
                saveUserData={this.saveUserData}
                email={this.state.email}
                petName={this.state.petName}
                roomName={this.state.roomName}
              />
              <Whitelist
                saveUserData={this.saveUserData}
                email={this.state.email}
                phoneNumbers={this.state.phoneNumbers}
              />
            </div>}
        </div>
      </div>
    );
  }
}

export default Settings;
