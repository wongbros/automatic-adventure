import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import auth from '../auth';

class PrivateRoute extends Component {
  static defaultProps = {
    location: undefined,
  };

  static propTypes = {
    component: PropTypes.func.isRequired,
    location: PropTypes.shape(),
  };

  state = {
    isAuthenticated: undefined,
  }

  async componentDidMount() {
    await this.checkAuthentication();
  }

  checkAuthentication = async () => {
    console.log({ auth });
    const isAuthenticated = await auth();
    console.log('setting state', isAuthenticated);
    this.setState({ isAuthenticated });
  }

  render() {
    console.log(this.state);
    if (this.state.isAuthenticated === undefined) {
      return null;
    }
    const { component: PropsComponent, ...rest } = this.props;
    const render = (props) => {
      console.log('location', props.location);
      return (
        this.state.isAuthenticated ?
          <PropsComponent {...props} /> :
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      );
    };
    return (
      <Route
        {...rest}
        render={render}
      />
    );
  }
}


export default PrivateRoute;
