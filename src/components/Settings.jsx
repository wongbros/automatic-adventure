import React, { Component } from 'react';
import { Card } from 'antd';
import 'antd/dist/antd.css';
import Whitelist from './Whitelist';
import Details from './Details';
import { getUserData, saveUserData } from '../service';

class Settings extends Component {
  state = {
    email: '',
    phoneNumbers: [],
    petName: '',
    roomName: '',
    // isShowing: false,
    // settingsHeader: 'Show Settings',
    tabKey: 'Details',
  };

  async componentDidMount() {
    await this.getUserData();
  }

  onTabChange = (type, key) => {
    this.setState({ [type]: key });
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

  // toggleSettingsView = () => {
  //   const settingsHeader = !this.state.isShowing ? 'Hide Settings' : 'Show Settings';
  //   this.setState({ settingsHeader, isShowing: !this.state.isShowing });
  // }

  render() {
    const tabList = [{
      key: 'Details',
      tab: 'Details',
    },
    {
      key: 'Whitelist',
      tab: 'Whitelist',
    }];
    const contentList = {
      Details: <Details
        saveUserData={this.saveUserData}
        email={this.state.email}
        petName={this.state.petName}
        roomName={this.state.roomName}
      />,
      Whitelist: <Whitelist
        saveUserData={this.saveUserData}
        email={this.state.email}
        phoneNumbers={this.state.phoneNumbers}
      />,
    };
    return (
      <div>
        <div>
          <Card
            style={{ width: '100%' }}
            tabList={tabList}
            activeTabKey={this.state.tabKey}
            onTabChange={(key) => { this.onTabChange('tabKey', key); }}
          >
            <div>
              {contentList[this.state.tabKey]}
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Settings;
