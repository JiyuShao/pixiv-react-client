import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './_mask.scss';

class Mask extends React.Component {
  static defaultProps = {
    onClick: () => { },
  }

  render() {
    const { className, style, children, ...restProps } = this.props;
    const clz = classnames(['mask'], className);
    const sty = {
      ...style,
      ...{
        display: this.props.visible ? 'block' : 'none'
      }
    }

    return (
      <div className={clz} style={sty} {...restProps}>
        <div onClick={(e) => {
          e.stopPropagation();
        }}>
          {children}
        </div>
      </div>
    );
  }
}

export default Mask;
