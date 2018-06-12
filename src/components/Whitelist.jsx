import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Button, Popconfirm, List, Col, Row, message } from 'antd';
import 'antd/dist/antd.css';

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
            bordered
            dataSource={this.props.phoneNumbers}
            renderItem={(phoneNumber, index) => (
              <List.Item>
                <Row>
                  <Col span={20}>
                    {phoneNumber}
                  </Col>
                  <Col span={4}>
                    <Popconfirm
                      title="Are you sure delete this task?"
                      onConfirm={() => this.deleteNumber(index)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button size="small" type="danger" ghost>
                        <Icon type="delete" />
                      </Button>
                    </Popconfirm>
                  </Col>
                </Row>
              </List.Item>)}
          />
        </div>
        <div>
          <Input
            type="text"
            value={this.state.phoneNumber}
            placeholder="Add Phone Number"
            onChange={this.updateCurrentNumber}
          />
        </div>
        <Button type="primary" onClick={this.saveNumber}>Save Number</Button>
      </div>
    );
  }
}

export default Whitelist;
