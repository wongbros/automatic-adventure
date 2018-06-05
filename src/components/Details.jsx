import React from 'react';
import PropTypes from 'prop-types';

class Details extends React.Component {
  static defaultProps = {
    petName: '',
    roomName: '',
  }

  static propTypes = {
    petName: PropTypes.string,
    roomName: PropTypes.string,
    saveUserData: PropTypes.func.isRequired,
  }

  state = {
    petName: '',
    roomName: '',
  }

  update = (stateName, value) => {
    this.setState({ [stateName]: value });
  }

  saveUserData = async () => {
    await this.props.saveUserData(this.state);
    this.setState({ petName: '', roomName: '' });
  }

  render() {
    return (
      <div className="details">
        <h4>Details</h4>
        <div>Pet Name: {this.props.petName}</div>
        <div>Room Name: {this.props.roomName}</div>
        <div>
          <input
            type="text"
            value={this.state.petName}
            placeholder="Update Pet Name"
            onChange={event => this.update('petName', event.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            value={this.state.roomName}
            placeholder="Update Room Name"
            onChange={event => this.update('roomName', event.target.value)}
          />
        </div>
        <button onClick={this.saveUserData}>Save Details</button>
      </div>
    );
  }
}

export default Details;
