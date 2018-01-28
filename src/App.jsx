import React from 'react';

import LoginPage from 'containers/login-page';

import 'weui';
import 'react-weui/build/packages/react-weui.css';
import 'styles/_common.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <LoginPage />
      </div>
    );
  }
}

export default App;
