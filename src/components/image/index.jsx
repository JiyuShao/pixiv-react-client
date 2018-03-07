import React from 'react';
import classnames from 'classnames';

import './_image.scss';
class Image extends React.Component {
  render() {
    let { className, src, alt, onError, imageStyle, ...restProps } = this.props;
    if (!onError) { //type maybe categoryId
      onError = e => e.target.src = '/images/error_image.png';
    }
    return <span className={classnames('image-wrapper', 'image', className)} {...restProps}>
      <img src={src} alt={alt} style={imageStyle} onError={onError}/>
    </span>
  }
}

export default Image;
