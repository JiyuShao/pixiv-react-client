import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Gallery as WeuiGallery,
} from 'react-weui';

import _actions from './actions';
import './_gallery.scss';

class Gallery extends React.Component {
  render() {
    let {
      src,
      galleryToggle,
    } = this.props;

    return (
      <WeuiGallery className="gallery"
        src={src}
        show={src != null}
      >
        <span
          className="gallery-close"
          onClick={() => { galleryToggle() }}
        >Back</span>
      </WeuiGallery>
    );
  }
}

const mapStateToProps = (state) => {
  let galleryComponentState = state['gallery'];

  return {
    src: galleryComponentState.src,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    galleryToggle: bindActionCreators(_actions.galleryToggle, dispatch),
  };
}

Gallery = connect(mapStateToProps, mapDispatchToProps)(Gallery);
export default Gallery;
