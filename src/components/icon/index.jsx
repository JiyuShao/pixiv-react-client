import React from 'react';
import classnames from 'classnames';
import SVG from 'react-svg-inline';

import Image from 'components/image';
import ImageList from 'images';
import './_icon.scss';

class Icon extends React.Component {
  // map icon with text code
  static iconCodeMapping = {
    "weui-icon-circle": "EA01",
    "weui-icon-download": "EA02",
    "weui-icon-info": "EA03",
    "weui-icon-safe_success": "EA04",
    "weui-icon-safe_warn": "EA05",
    "weui-icon-success": "EA06",
    "weui-icon-success-circle": "EA07",
    "weui-icon-success-no-circle": "EA08",
    "weui-icon-waiting": "EA09",
    "weui-icon-waiting-circle": "EA0A",
    "weui-icon-warn": "EA0B",
    "weui-icon-info-circle": "EA0C",
    "weui-icon-cancel": "EA0D",
    "weui-icon-search": "EA0E",
    "weui-icon-clear": "EA0F",
    "weui-icon-back": "EA10",
    "weui-icon-delete": "EA11",
    "weui-btn": "EA08 ",
    "weui-cells_checkbox weui-icon-checked": "EA01",
    "weui-cells_checkbox weui-check:checked+weui-icon-checked": "EA06",
    "weui-picker__hd": "EA08",
  };

  // map icon with text
  static iconTextMapping = {
    "yes": "✓",
    "no": "✗",
  }

  // map icon with svg path/data
  static iconSvgMapping = {
    ...ImageList,
  }

  // map icon with image path/data
  static iconImageMapping = {
    'cancel': 'https://res.cloudinary.com/goopter/image/upload/v1482524907/admin/i_delete.png',
    'left-arrow': 'https://res.cloudinary.com/goopter/image/upload/v1478719835/admin/i_back.png',
    'minus-icon': 'https://res.cloudinary.com/goopter/image/upload/v1480380858/admin/i_minus.png',
    'plus-icon': 'https://res.cloudinary.com/goopter/image/upload/v1480380858/admin/i_plus.png',
  }

  // map icon with react component
  static iconComponentMapping = {
    'weui-loading': <div className="weui_loading"><i className="weui-loading weui-icon_toast"></i></div>,
  }

  static iconMapping = {
    'cancel': <Image className="icon-image" src="https://res.cloudinary.com/goopter/image/upload/v1482524907/admin/i_delete.png" />,
    'left-arrow': <Image className="icon-image" src="https://res.cloudinary.com/goopter/image/upload/v1478719835/admin/i_back.png" />,
  }

  static defaultProps = {
    color: '#fff'
  }

  render() {
    let { className, name, width, height, color, ...restProps } = this.props;
    let content;
    if (Icon.iconCodeMapping[name]) {
      content = String.fromCodePoint(parseInt(Icon.iconCodeMapping[name], 16));
    } else if (Icon.iconTextMapping[name]) {
      content = Icon.iconTextMapping[name];
    } else if (Icon.iconSvgMapping[name]) {
      content = <SVG className="icon-image icon-svg" svg={Icon.iconSvgMapping[name]} fill={color} />;
    } else if (Icon.iconImageMapping[name]) {
      content = <Image className="icon-image" src={Icon.iconImageMapping[name]} />;
    } else if (Icon.iconComponentMapping[name]) {
      content = Icon.iconComponentMapping[name];
    } else {
      content = <b>Icon</b>;
    }

    return (
      <span
        className={classnames(['weui-icon', 'inline-flex', 'flex-direction-column', 'flex-justify-content-center', className])}
        style={{
          color
        }}
        {...restProps}
      >
        {content}
      </span>
    );
  }
}

export default Icon;
