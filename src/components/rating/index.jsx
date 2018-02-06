import React from 'react';

import './_rating.scss';

class Rating extends React.Component {
  static defaultProps = {
    rating: 0,
  }

  render() {
    return (
      <div className="rating-container" rating={this.props.rating}>
        <div className="rating-group__empty">
          <i className="star"></i>
          <i className="star"></i>
          <i className="star"></i>
          <i className="star"></i>
          <i className="star"></i>
        </div>
        <div className="rating-group__fill" style={{
          width: this.props.rating * 20 + '%'
        }}>
          <i className="star"></i>
          <i className="star"></i>
          <i className="star"></i>
          <i className="star"></i>
          <i className="star"></i>
        </div>
      </div>
    )
  }
}

export default Rating;
