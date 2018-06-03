import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Media from './components/Media';
import Login from './components/Login';
import Landing from './components/Landing';
import PrivateRoute from './components/PrivateRoute';
import Whitelist from './components/Whitelist';
import './index.css';


const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Landing} />
      <Route path="/auth" component={Login} />
      <PrivateRoute path="/whitelist" component={Whitelist} />
      <PrivateRoute path="/media" component={Media} />
    </div>
  </Router>
);

export default Routes;
