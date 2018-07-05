import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, message, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import './Settings.css';

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
    message.success('Details saved!');
  }

  render() {
    return (
      <div className="details">
        <h4>Details</h4>
        <div className="margins">
          <Input
            type="text"
            disabled={!this.state.isEditing}
            value={this.state.petName}
            placeholder="Update Pet Name"
            onChange={event => this.update('petName', event.target.value)}
          />
        </div>
        <div className="margins">
          <Input
            type="text"
            disabled={!this.state.isEditing}
            value={this.state.roomName}
            placeholder="Update Room Name"
            onChange={event => this.update('roomName', event.target.value)}
          />
        </div>
        <Row type="flex" justify="center">
          <Col>
            {this.state.isEditing ?
              <Button type="primary" onClick={this.saveUserData}>Save Details</Button> :
              <Button type="default" onClick={() => this.setEditingMode(true)}>Edit Details</Button>}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Details;
