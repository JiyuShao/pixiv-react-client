import React from 'react';
import classnames from 'classnames';

import './_image.scss';
class Image extends React.Component {
  render() {
    const { className, src, alt, onError, imageStyle, ...restProps } = this.props;
    return <span className={classnames('flexbox', 'flex-justify-content-center', 'image-wrapper', 'image', className)} {...restProps}>
      <img src={src} alt={alt} style={imageStyle} onError={onError}/>
    </span>
  }
}

export default Image;
