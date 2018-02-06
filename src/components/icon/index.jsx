import React from 'react';
import classnames from 'classnames';
import './_icon.scss';

class Icon extends React.Component {
  static iconCode = {
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
    "weui-picker__hd": "EA08"
  };

  render() {
    let { className, type, ...restProps } = this.props;
    return (
      <span {...restProps} className={classnames(['weui-icon', className])}>
        {(Icon.iconCode[type]) ? String.fromCodePoint(parseInt(Icon.iconCode[type], 16)) : ''}
      </span>
    );
  }
}

export default Icon;
