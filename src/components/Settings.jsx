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
    settingsHeader: 'Hide Settings',
    settingsBlock: 'showBlock',
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
    let { settingsHeader, settingsBlock } = this.state;
    settingsHeader = settingsHeader === 'Hide Settings' ? 'Show Settings' : 'Hide Settings';
    settingsBlock = settingsBlock === 'showBlock' ? 'hideBlock' : 'showBlock';
    this.setState({ settingsHeader, settingsBlock });
  }

  render() {
    return (
      <div>
        <div>
          <h3>
            <div
              className="settingsToggle"
              onClick={this.toggleSettingsView}
              role="button"
            >
              {this.state.settingsHeader}
            </div>
          </h3>
          <div className={this.state.settingsBlock}>
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
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
