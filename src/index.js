import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

import HomePage from './homepage';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={HomePage}>
    
    </Route>
  </Router>
), document.getElementById('app'));