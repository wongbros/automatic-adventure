import React from 'react';
import PropTypes from 'prop-types';
// import { /* getUserData, */ saveUserData } from '../service';

class Details extends React.Component {
  static defaultProps = {
    petName: '',
    roomName: '',
  }

  static propTypes = {
    petName: PropTypes.string,
    roomName: PropTypes.string,
    update: PropTypes.func.isRequired,
  }

  state = {
    petName: this.props.petName,
    roomName: this.props.roomName,
  }

  update = (stateName, value) => {
    this.setState({ [stateName]: value });
    this.props.update(stateName, value);
  }

  // saveDetails = async () => {
  //   await saveUserData({
  //     petName: this.state.petName,
  //     room: this.state.roomName,
  //   });
  // }

  render() {
    return (
      <div>
        <div>
          <div>Pet Name: {this.props.petName}</div>
          <input
            type="text"
            value={this.state.petName}
            placeholder="Update Pet Name"
            onChange={event => this.update('petName', event.target.value)}
          />
        </div>
        <div>
          <div>Room Name: {this.props.roomName}</div>
          <input
            type="text"
            value={this.state.roomName}
            placeholder="Update Room Name"
            onChange={event => this.update('roomName', event.target.value)}
          />
        </div>
      </div>
    );
  }
}

export default Details;
