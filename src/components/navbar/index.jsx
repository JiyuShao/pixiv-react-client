import React from 'react';
import {
  Flex,
  FlexItem
} from 'react-weui';

import './_navbar.scss';

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <Flex className="weui-flex navbar-header">
          <FlexItem>
            <div>weui</div>
          </FlexItem>
          <FlexItem>
            <div>weui</div>
          </FlexItem>
        </Flex>
      </div>
    );
  }
}

export default Navbar;
