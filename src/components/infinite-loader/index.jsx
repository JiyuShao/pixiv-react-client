import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import classNames from 'classnames';
import { LoadMore } from 'react-weui';

import './_infinite-loader.scss';

/**
 *  A Container trigger loading once it reach certain scrolltop
 *
 */
class InfiniteLoader extends Component {

  static propTypes = {
    /**
     * height for the container, use string like '10px', default for '100vh'
     *
     */
    height: PropTypes.string,
    /**
     * element(icon) for default loader when there is no more content
     *
     */
    loaderDefaultIcon: PropTypes.object,
    /**
     * element(icon) for loading loader
     *
     */
    loaderLoadingIcon: PropTypes.object,
    /**
     * percentage of scrollTop to trigger loading
     *
     */
    triggerPercent: PropTypes.number,
    /**
     * callback when user scroll the content, pass event
     *
     */
    onScroll: PropTypes.func,
    /**
     * callback when user did not scroll for 150ms
     *
     */
    onScrollEnd: PropTypes.func,
    /**
     * callback when it's requesting for more content, pass resolve function and finish function
     *
     */
    onLoadMore: PropTypes.func,
    /**
     * disable the loader
     *
     */
    disable: PropTypes.bool,
    finish: PropTypes.bool,
  };

  static defaultProps = {
    height: '100vh',
    triggerPercent: 75,
    loaderLoadingIcon: <LoadMore loading> Loading... </LoadMore>,
    loaderDefaultIcon: <LoadMore showLine> No Data</LoadMore>,
    disable: false,
    finish: false,
  }

  constructor(props) {
    super(props);

    let scrollTimer = (e) => { };
    this.scrollHandle = this.scrollHandle.bind(this);
  }

  state = {
    loading: false
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      loading: false
    })
  }

  componentDidUpdate() {
    //reset scroll top if user search another text
    if (typeof this.props.scrollTop !== 'undefined' && document.querySelector(`.react-weui-infiniteloader`)) {
      document.querySelector(`.react-weui-infiniteloader`).scrollTop = this.props.scrollTop;
      console.log(`.react-weui-infiniteloader`, document.querySelector(`.react-weui-infiniteloader`).scrollTop);
    }
  }

  scrollHandle(e) {
    if (this.props.onScroll) this.props.onScroll(e);
    if (this.state.loading || this.props.finish || this.props.disable || e.target.scrollTop === 0) return;

    //setup for scrollend event
    clearTimeout(this.scrollTimer);
    this.scrollTimer = setTimeout(() => {
      if (this.props.onScrollEnd) this.props.onScrollEnd();
    }, 150);

    let target = e.target;
    let scrollPercent = Math.floor(((target.scrollTop + target.clientHeight) / target.scrollHeight) * 100);

    if (scrollPercent > this.props.triggerPercent) {
      this.setState({
        ...this.state,
        loading: true
      })
      this.props.onLoadMore();
    }
  }

  render() {
    const { children, className, height, scrollTop, triggerPercent, disable, finish, setLoading, loaderLoadingIcon, loaderDefaultIcon, onScrollEnd, onScroll, onLoadMore, ...domProps } = this.props;
    const { loading } = this.state;
    const clx = classNames('react-weui-infiniteloader', className);

    let containerStyle = {
      height,
    };

    let contentStyle = {
      overflow: disable ? 'hidden' : 'scroll'
    };

    let loadingStyle = {
      display: loading || finish ? 'block' : 'none'
    }

    return (
      <div
        className={clx}
        style={containerStyle}
        onScroll={this.scrollHandle}
        {...domProps}
      >
        <div
          className="react-weui-infiniteloader__content"
          style={contentStyle}
          ref="container"
        >
          {children}
          <div style={loadingStyle}>
            {finish ? loaderDefaultIcon : loaderLoadingIcon}
          </div>
        </div>
      </div>
    );
  }
}

export default InfiniteLoader;
