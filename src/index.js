import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import HomePage from './homepage';
import PostTopic from './postTopic';
import BdProductInfo from './bdProductInfo';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={HomePage} />
    <Route path="/new-topic" component={PostTopic} />
    {/*<Route path="/topics/:id/details" component={} />*/}
  </Router>
), document.getElementById('app'));