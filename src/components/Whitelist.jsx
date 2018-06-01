import React from 'react';
import './Whitelist.css';

class Whitelist extends React.Component {
  state = {
    phoneNumber: '',
    phoneNumbers: [],
  }

  updateCurrentNumber = (event) => {
    const currentNumber = event.target.value;
    this.setState({ phoneNumber: currentNumber });
  }

  saveNumber = () => {
    const updatedNumberList = [...this.state.phoneNumbers];
    updatedNumberList.push(this.state.phoneNumber);
    this.setState({
      phoneNumber: '',
      phoneNumbers: updatedNumberList,
    });
  }

  render() {
    return (
      <div>whitelist
        <div>
          <ul>
            {this.state.phoneNumbers.map(phoneNumber => <li>{phoneNumber}</li>)}
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
