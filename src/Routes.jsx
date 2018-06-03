import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Media from './components/Media';
import Landing from './components/Landing';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import Whitelist from './components/Whitelist';
import './index.css';


const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Landing} />
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/whitelist" component={Whitelist} />
      <PrivateRoute path="/media" component={Media} />
    </div>
  </Router>
);

export default Routes;
