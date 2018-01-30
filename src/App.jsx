import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import PrivateRoute from 'components/private-route';

import LoginPage from 'containers/login-page';
import MainPageContainer from 'containers/main-page-container';

import 'weui';
import 'react-weui/build/packages/react-weui.css';
import 'styles/_common.scss';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute exact path="/" component={MainPageContainer} />
          <PrivateRoute path="/home" component={MainPageContainer} />
          <PrivateRoute path="/search" component={MainPageContainer} />
          <PrivateRoute path="/profile" component={MainPageContainer} />
        </div>
      </Router>
    );
  }
}

export default App;
