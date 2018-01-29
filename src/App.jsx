import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import LoginPage from './containers/login-page';
import MainPageContainer from 'containers/main-page-container';

import 'weui';
import 'react-weui/build/packages/react-weui.css';
import 'styles/_common.scss';

class App extends React.Component {
  constructor() {
    super();
    this.loggedIn = sessionStorage.getItem('loggedIn') === 'true';
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={(props) => (
            !this.loggedIn ? <Redirect to="/login" /> : <MainPageContainer {...props} />
          )} />
          <Route path="/login" component={LoginPage} />
          <Route path="/home" component={MainPageContainer} />
          <Route path="/search" component={MainPageContainer} />
          <Route path="/profile" component={MainPageContainer} />
        </div>
      </Router>
    );
  }
}

export default App;
