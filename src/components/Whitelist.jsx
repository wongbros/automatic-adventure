import React from 'react';
import './Whitelist.css';
import { getUserData, saveUserData } from '../service';

class Whitelist extends React.Component {
  state = {
    phoneNumber: '',
    phoneNumbers: [],
    email: '',
  }

  async componentDidMount() {
    await this.getPhoneNumbers();
  }

  getPhoneNumbers = async () => {
    const userData = await getUserData();
    const phoneNumbers = userData.eligible_phone_numbers;
    const { email } = userData;
    this.setState({ phoneNumbers, email });
  }

  updateCurrentNumber = (event) => {
    const currentNumber = event.target.value;
    this.setState({ phoneNumber: currentNumber });
  }

  saveNumber = async () => {
    const updatedNumberList = [...this.state.phoneNumbers];
    updatedNumberList.push(this.state.phoneNumber);
    this.setState({
      phoneNumber: '',
      phoneNumbers: updatedNumberList,
    });
    await saveUserData(this.state.email, updatedNumberList);
  }

  deleteNumber = async (index) => {
    const updatedNumberList = [...this.state.phoneNumbers];
    updatedNumberList.splice(index, 1);
    this.setState({ phoneNumbers: updatedNumberList });
    await saveUserData(this.state.email, updatedNumberList);
  }

  render() {
    return (
      <div>whitelist
        <div>
          <ul>
            {this.state.phoneNumbers.map((phoneNumber, index) =>
              (<li key={`phone-${phoneNumber}`}>
                {phoneNumber}
                <button onClick={() => this.deleteNumber(index)}>X</button>
               </li>))}
          </ul>
        </div>
        <input
          type="text"
          value={this.state.phoneNumber}
          onChange={this.updateCurrentNumber}
        />
        <button onClick={this.saveNumber}>Save</button>
      </div>
    );
  }
}

export default Whitelist;
