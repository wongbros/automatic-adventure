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
    petName: this.props.petName,
    roomName: this.props.roomName,
    isEditing: false,
  }

  setEditingMode = (isEditing) => {
    this.setState({ isEditing });
  }

  update = (stateName, value) => {
    this.setState({ [stateName]: value });
  }

  saveUserData = async () => {
    await this.props.saveUserData(this.state);
    this.setEditingMode(false);
  }

  render() {
    return (
      <div className="details">
        <h4>Details</h4>
        <div>
          <input
            type="text"
            disabled={!this.state.isEditing}
            value={this.state.petName}
            placeholder="Update Pet Name"
            onChange={event => this.update('petName', event.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            disabled={!this.state.isEditing}
            value={this.state.roomName}
            placeholder="Update Room Name"
            onChange={event => this.update('roomName', event.target.value)}
          />
        </div>
        {this.state.isEditing ?
          <button onClick={this.saveUserData}>Save Details</button> :
          <button onClick={() => this.setEditingMode(true)}>Edit Details</button>}

      </div>
    );
  }
}

export default Details;
