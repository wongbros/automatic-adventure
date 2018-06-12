import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, message } from 'antd';
import 'antd/dist/antd.css';

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.petName !== this.props.petName) {
      this.setState({ petName: nextProps.petName });
    }
    if (nextProps.roomName !== this.props.roomName) {
      this.setState({ roomName: nextProps.roomName });
    }
  }

  update = (stateName, value) => {
    this.setState({ [stateName]: value });
  }

  saveUserData = async () => {
    await this.props.saveUserData(this.state);
    this.setState({ petName: '', roomName: '' });
    message.success('Details saved!');
  }

  render() {
    return (
      <div className="details">
        <h4>Details</h4>
        <div>Pet Name: {this.props.petName}</div>
        <div>Room Name: {this.props.roomName}</div>
        <div>
          <Input
            type="text"
            placeholder="Update Pet Name"
            onChange={event => this.update('petName', event.target.value)}
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Update Room Name"
            onChange={event => this.update('roomName', event.target.value)}
          />
        </div>
        <Button type="primary" onClick={this.saveUserData}>Save Details</Button>
      </div>
    );
  }
}

export default Details;
