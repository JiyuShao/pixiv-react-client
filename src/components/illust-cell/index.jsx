import React from 'react';
import MultiClamp from 'react-multi-clamp';

import Image from 'components/image';
import './_illust-cell.scss';

class IllustCell extends React.Component {
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
      isBookmarked = <Image className="is-bookmarked" src="https://png.icons8.com/ios/50/ef5011/hearts-filled.png" alt="is bookmarked" />
    } else {
      isBookmarked = <Image className="is-bookmarked" src="https://png.icons8.com/ios/50/cccccc/hearts.png" alt="not bookmarked" />
    }
    return (
      <div className="weui-cell weui-cell_access illust-cell" onClick={this.props.onClick}>
        <div className="weui-cell__hd illust-cell__hd flexbox">
          <Image onError={e => e.target.src = this.props.errorImage} src={this.props.image} />
        </div>
        <div className="weui-cell__bd illust-cell__bd">
          <div className="flexbox title">
            <div className="flex-1 word-break-break-all">
              <MultiClamp clamp={2} ellipsis="..." disableCssClamp={true}>{this.props.title}{this.props.title}{this.props.title}</MultiClamp>
            </div>

            <div className="title__extra">
              {isBookmarked}
            </div>
          </div>

          <div className="description">
            <MultiClamp clamp={1} ellipsis="..." disableCssClamp={true}>{this.props.description}</MultiClamp>
          </div>
          <div className="tags">
            <MultiClamp clamp={1} ellipsis="..." disableCssClamp={true}>{this.props.tags}</MultiClamp>
          </div>
        </div>
        <div className="weui-cell__ft illust-cell__ft"></div>
      </div>
    );
  }
}

export default IllustCell;
