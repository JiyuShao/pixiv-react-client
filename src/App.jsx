import React from 'react';
import 'weui';
import 'react-weui/build/packages/react-weui.css';

import 'styles/_flex.scss';
import Navbar from 'components/navbar';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
      </div>
    );
  }
}

export default App;
