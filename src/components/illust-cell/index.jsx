import React from 'react';
import Truncate from 'react-truncate';

import Rating from 'components/rating';
import './_illust-cell.scss';


class StoreCell extends React.Component {
  static defaultProps = {
    onClick: () => { },
    image: '',
    original_image: '',
    error_image: '',
    title: 'Goopter Store',
    caption: '',
    tags: '',
    is_bookmarked: false,
  }

  render() {
    let isBookmarked = '';
    if (this.props.is_bookmarked) {
      isBookmarked = <img className="is-bookmarked" src="https://png.icons8.com/ios/50/ef5011/hearts-filled.png" alt="is bookmarked" />
    } else {
      isBookmarked = <img className="is-bookmarked" src="https://png.icons8.com/ios/50/cccccc/hearts.png" alt="not bookmarked" />
    }
    return (
      <div className="weui-cell weui-cell_access illust-cell" onClick={this.props.onClick}>
        <div className="weui-cell__hd illust-cell__hd flexbox">
          <img onError={e => e.target.src = this.props.errorImage} src={this.props.image} />
        </div>
        <div className="weui-cell__bd illust-cell__bd">
          <div className="flexbox title">
            <div className="flex-1 word-break-break-all">
              <Truncate lines={2} ellipsis="...">{this.props.title}{this.props.title}{this.props.title}</Truncate>
            </div>

            <div className="title__extra">
              {isBookmarked}
            </div>
          </div>

          <div className="description">
            <Truncate lines={1} ellipsis="...">{this.props.description}</Truncate>
          </div>
          <div className="tags">
            <Truncate lines={1} ellipsis="...">{this.props.tags}</Truncate>
          </div>
        </div>
        <div className="weui-cell__ft illust-cell__ft"></div>
      </div>
    );
  }
}

export default StoreCell;
