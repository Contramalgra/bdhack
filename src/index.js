import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

import HomePage from './homepage';
import PostTopic from './postTopic';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={HomePage}>
      <Route path="new-topic" component={PostTopic} />
    </Route>
  </Router>
), document.getElementById('app'));