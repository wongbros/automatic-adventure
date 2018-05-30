import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './index.css';
import Media from './components/Media';
import Login from './components/Login';
import Landing from './components/Landing';
import auth from './auth';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const render = (props) => {
    return (
      auth.isAuthenticated ?
        <Component {...props} /> :
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    );
  };
  return (
    <Route
      {...rest}
      render={render}
    />
  );
};

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Landing} />
      <Route path="/auth" component={Login} />
      <PrivateRoute path="/media" component={Media} />
    </div>
  </Router>
);

export default Routes;
