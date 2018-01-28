import React from 'react';
import Notification from 'rmc-notification';

import './_toast.scss';

let messageInstance;

function getMessageInstance(callback) {
  if (messageInstance) {
    messageInstance.destroy();
    messageInstance = null;
  }

  Notification.newInstance({
    style: {}, // clear rmc-notification default style
    transitionName: 'weui-toast',
  }, (notification) => callback && callback(notification));
}

function notice(params) {
  let defaultParams = {
    content: 'Toast',
    type: 'success',
    duration: 3,
    closable: true,
    onClose: () => { }
  };

  let iconTypes = {
    text: 'weui-icon-text',
    success: 'weui-icon-success-no-circle',
    cancel: 'weui-icon-cancel',
    forbidden: 'weui-icon-warn',
    loading: 'weui-loading',
  };

  params = Object.assign({}, defaultParams, params);
  params.icon = (iconTypes[params.type]) ? iconTypes[params.type] : iconTypes['success'];

  getMessageInstance((notification) => {
    messageInstance = notification;

    notification.notice({
      duration: params.duration,
      style: {},
      content: (
        <div className="weui-toast-container">
          <div className="weui-mask_transparent"></div>
          <div className={`weui-toast ${(params.type === 'text') ? 'weui-toast_text' : 'weui-toast_normal'}`}>
            <i className={`weui-icon_toast ${params.icon}`}></i>
            <p className="weui-toast_content">{params.content}</p>
          </div>
        </div>
      ),
      closable: params.closable,
      onClose() {
        if (params.onClose) {
          params.onClose();
        }
        notification.destroy();
        notification = null;
        messageInstance = null;
      },
    });
  });
}

function handleParams(params, callback) {
  if (typeof params === 'string') {
    params = {
      content: params
    };

    if (typeof callback === 'function') {
      params.onClose = callback;
    }
  }

  return params;
}

export default {
  text(params, callback) {
    params = handleParams(params, callback);
    return notice({ ...params, type: 'text' })
  },
  success(params, callback) {
    params = handleParams(params, callback);
    return notice({ ...params, type: 'success' })
  },
  cancel(params, callback) {
    params = handleParams(params, callback);
    return notice({ ...params, type: 'cancel' })
  },
  forbidden(params, callback) {
    params = handleParams(params, callback);
    return notice({ ...params, type: 'forbidden' })
  },
  loading(params, callback) {
    params = handleParams(params, callback);
    return notice({ ...params, type: 'loading', duration: 0 })
  },
  hide() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  },
};
