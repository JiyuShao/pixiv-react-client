import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  SearchBar,
  //for display data
  Panel,
  PanelHeader,
  PanelBody,
  PanelFooter,
  MediaBox,
  MediaBoxHeader,
  MediaBoxBody,
  MediaBoxTitle,
  MediaBoxDescription,
  Cell,
  CellBody,
  CellFooter,
  Button,
  Gallery,
} from 'react-weui';

import TabbarContainer from 'containers/tabbar-container';

import './_search-page.scss';

import _actions from './actions';

const CellMore = () => (
  <Cell access link>
    <CellBody>More</CellBody>
    <CellFooter />
  </Cell>
)

class SearchPage extends React.Component {
  componentWillMount() {
    this.props.fetchTrendingTags();
  }

  render() {
    return (
      <TabbarContainer currentTab="search">
        <SearchBar
          placeholder={this.props.searchText ? this.props.searchText : "Enter keyword"}
          lang={{
            cancel: 'Cancel'
          }}
          onChange={this.props.textChange}
          onCancel={this.props.textChange}
          onSubmit={this.props.fetchSearchResult}
        />

        <Panel style={{ display: (this.props.searchText && this.props.searchResult.length > 0) ? null : 'none' }}>
          <PanelHeader>
            {`Search Key: ${this.props.searchText}`}
          </PanelHeader>
          <PanelBody>
            {
              this.props.searchResult.length > 0 ?
                this.props.searchResult.map((currentResult, index) => {
                  return (
                    <MediaBox key={index} type="appmsg" href="javascript:void(0);" onClick={() => {
                      this.props.galleryToggle(currentResult.image_urls.large);
                    }}>
                      <MediaBoxHeader className="media-box-image-container">
                        <img src={currentResult.image_urls.square_medium} />
                      </MediaBoxHeader>
                      <MediaBoxBody>
                        <MediaBoxTitle>{currentResult.title}</MediaBoxTitle>
                        <MediaBoxDescription>
                          {currentResult.caption}
                        </MediaBoxDescription>
                      </MediaBoxBody>
                    </MediaBox>
                  )
                })
                : <MediaBox>Can't find any！</MediaBox>
            }
          </PanelBody>
          <PanelFooter href="javascript:void(0);">
            <CellMore />
          </PanelFooter>
        </Panel>

        <div className="weui-grids tag-grids" style={{ display: (this.props.searchText && this.props.searchResult.length > 0) ? 'none' : null }}>
          {
            this.props.trendingTags.map((currentTag, index) => {
              return (
                <a key={index} className="weui-grid" href="javascript:;" onClick={() => {
                  this.props.fetchSearchResult(currentTag.tag);
                }}>
                  <div className="weui-grid__icon">
                    <img src={currentTag.illust.image_urls[(index === 0) ? 'medium' : 'square_medium']} />
                  </div>
                  <p className="weui-grid__label">{currentTag.tag}</p>
                </a>
              );
            })
          }

        </div>

        <Gallery className="gallery" src={this.props.galleryDisplayUrl}
          // defaultIndex={this.props.galleryDisplayUrl}
          show={this.props.galleryDisplay}>
          <Button className="gallery-close"
            onClick={() => { this.props.galleryToggle() }}
            plain
          >Back</Button>
        </Gallery>
      </TabbarContainer>
    );
  }
};

const mapStateToProps = (state) => {
  let currentComponentState = state['search-page'];
  return {
    trendingTags: currentComponentState.trendingTags,
    searchText: currentComponentState.searchText,
    searchResult: currentComponentState.searchResult,
    nextSearchUrl: currentComponentState.nextSearchUrl,
    galleryDisplay: currentComponentState.galleryDisplay,
    galleryDisplayUrl: currentComponentState.galleryDisplayUrl,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrendingTags: bindActionCreators(_actions.fetchTrendingTags, dispatch),
    textChange: bindActionCreators(_actions.textChange, dispatch),
    fetchSearchResult: bindActionCreators(_actions.fetchSearchResult, dispatch),
    galleryToggle: bindActionCreators(_actions.galleryToggle, dispatch),
  };
}

SearchPage = connect(mapStateToProps, mapDispatchToProps)(SearchPage);
export default SearchPage;
