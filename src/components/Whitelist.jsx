import React from 'react';
import PropTypes from 'prop-types';
import './Whitelist.css';

class Whitelist extends React.Component {
  static defaultProps = {
    phoneNumbers: [],
  }

  static propTypes = {
    phoneNumbers: PropTypes.arrayOf(PropTypes.string),
    saveUserData: PropTypes.func.isRequired,
  }

  state = {
    phoneNumber: '',
  }

  updateCurrentNumber = (event) => {
    const currentNumber = event.target.value;
    this.setState({ phoneNumber: currentNumber });
  }

  saveNumber = () => {
    const updatedNumberList = [...this.props.phoneNumbers];
    updatedNumberList.push(this.state.phoneNumber);
    this.setState({
      phoneNumber: '',
    });
    this.props.saveUserData({ phoneNumbers: updatedNumberList });
  }

  deleteNumber = (index) => {
    const updatedNumberList = [...this.props.phoneNumbers];
    updatedNumberList.splice(index, 1);
    this.props.saveUserData({ phoneNumbers: updatedNumberList });
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
            placeholder="Add Phone Number"
            onChange={this.updateCurrentNumber}
          />
        </div>
        <button onClick={this.saveNumber}>Save Number</button>
      </div>
    );
  }
}

export default Whitelist;
