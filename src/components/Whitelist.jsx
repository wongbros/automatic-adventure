import React from 'react';
import PropTypes from 'prop-types';
import './Whitelist.css';
// import { /* getUserData, */ saveUserData } from '../service';

class Whitelist extends React.Component {
  static defaultProps = {
    phoneNumbers: [],
  }

  static propTypes = {
    phoneNumbers: PropTypes.arrayOf(PropTypes.string),
    update: PropTypes.func.isRequired,
  }

  state = {
    phoneNumber: '',
  }

  updateCurrentNumber = (event) => {
    const currentNumber = event.target.value;
    this.setState({ phoneNumber: currentNumber });
  }

  insertNumber = () => {
    const updatedNumberList = [...this.props.phoneNumbers];
    updatedNumberList.push(this.state.phoneNumber);
    this.setState({
      phoneNumber: '',
      // phoneNumbers: updatedNumberList,
    });
    this.props.update('phoneNumbers', updatedNumberList);
    // await saveUserData({ eligiblePhoneNumbers: updatedNumberList });
  }

  deleteNumber = (index) => {
    const updatedNumberList = [...this.props.phoneNumbers];
    updatedNumberList.splice(index, 1);
    // this.setState({ phoneNumbers: updatedNumberList });
    this.props.update('phoneNumbers', updatedNumberList);
    // await saveUserData({ eligiblePhoneNumbers: updatedNumberList });
  }

  render() {
    return (
      <div className="whitelist">
        <h4>Whitelist Numbers</h4>
        <div>
          <ul>
            {this.props.phoneNumbers.map((phoneNumber, index) => (
              <li key={`phone-${phoneNumber}`}>
                {phoneNumber}
                <button onClick={() => this.deleteNumber(index)}>X</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <input
            type="text"
            value={this.state.phoneNumber}
            onChange={this.updateCurrentNumber}
          />
          <button onClick={this.insertNumber}>+</button>
        </div>
      </div>
    );
  }
}

export default Whitelist;
