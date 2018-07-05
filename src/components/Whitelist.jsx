import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Button, Popconfirm, List, Col, Row, message } from 'antd';
import 'antd/dist/antd.css';
import './Settings.css';

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
    message.success('Phone number deleted!');
  }

  render() {
    return (
      <div className="whitelist">
        <h4>Whitelist Numbers</h4>
        <div>
          <List
            dataSource={this.props.phoneNumbers}
            renderItem={(phoneNumber, index) => (
              <List.Item>
                <Row className="max-width" type="flex" justify="space-between">
                  <Col span={4}>
                    {phoneNumber}
                  </Col>
                  <Col span={4} offset={8}>
                    <Popconfirm
                      title="Are you sure you want to delete this number?"
                      onConfirm={() => this.deleteNumber(index)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button className="delete-btn" size="small" type="danger" ghost>
                        <Icon type="delete" />
                      </Button>
                    </Popconfirm>
                  </Col>
                </Row>
              </List.Item>)}
          />
        </div>
        <div className="margins">
          <Input
            type="text"
            value={this.state.phoneNumber}
            placeholder="Add Phone Number"
            onChange={this.updateCurrentNumber}
          />
        </div>
        <Row type="flex" justify="center">
          <Col>
            <Button type="primary" onClick={this.saveNumber}>Save Number</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Whitelist;
