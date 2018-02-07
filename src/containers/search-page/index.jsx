import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  SearchBar,
  //for display data
  Panel,
  PanelHeader,
  PanelBody,
  Button,
  Gallery,
} from 'react-weui';

import Image from 'components/image';
import InfiniteLoader from 'components/infinite-loader';
import IllustCell from 'components/illust-cell';
import TabbarContainer from 'containers/tabbar-container';

import './_search-page.scss';

import _actions from './actions';
class SearchPage extends React.Component {
  componentWillMount() {
    this.props.fetchTrendingTags();
  }

  render() {
    return (
      <TabbarContainer className="search-page-container" currentTab="search">
        <SearchBar
          className="search-bar"
          placeholder={this.props.searchText ? this.props.searchText : "Enter keyword"}
          lang={{
            cancel: 'Cancel'
          }}
          onChange={this.props.textChange}
          onCancel={this.props.textChange}
          onSubmit={(text) => {
            this.props.fetchSearchResult({
              text: text,
              sortOptions: this.props.sortOptions,
              searchResult: this.props.searchResult,
            })
          }}
        />

        <InfiniteLoader
          style={{
            display: (this.props.tab === 'result') ? null : 'none',
            height: document.documentElement.clientHeight - document.documentElement.clientWidth * 0.2506  // 0.355 is navbar + search bar + search tab ?vw
          }}
          onLoadMore={() => {
            this.props.fetchSearchResult({
              text: this.props.searchText,
              sortOptions: this.props.sortOptions,
              searchResult: this.props.searchResult,
            })
          }}
          // scrollTop={undefined}
          finish={!this.props.searchResult.next_url}
        >
          <Panel className="search-result-container">
            <PanelHeader>
              {`Search Key: ${this.props.searchText}`}
            </PanelHeader>
            <PanelBody>
              {
                this.props.searchResult.records.map((currentResult, index) => {
                  return (
                    <IllustCell
                      key={index}
                      image={currentResult.image_urls.square_medium}
                      original_image={currentResult.image_urls.large}
                      title={currentResult.title}
                      description={currentResult.caption}
                      tags={currentResult.tags.map(e => e.name).join(', ')}
                      is_bookmarked={currentResult.is_bookmarked}
                      onClick={() => {
                        this.props.galleryToggle(currentResult.image_urls.large);
                      }}
                    />
                  )
                })
              }
            </PanelBody>
          </Panel>
        </InfiniteLoader>

        <div className="weui-grids tag-grids" style={{ display: (this.props.tab === 'tags') ? null : 'none' }}>
          {
            this.props.trendingTags.map((currentTag, index) => {
              return (
                <a key={index} className="weui-grid" href="javascript:;" onClick={() => {
                  this.props.fetchSearchResult({
                    text: currentTag.tag,
                    sortOptions: this.props.sortOptions,
                    searchResult: this.props.searchResult,
                  });
                }}>
                  <div className="weui-grid__icon">
                    <Image src={currentTag.illust.image_urls[(index === 0) ? 'medium' : 'square_medium']} />
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
    tab: currentComponentState.tab,
    trendingTags: currentComponentState.trendingTags,
    searchText: currentComponentState.searchText,
    sortOptions: currentComponentState.sortOptions,
    searchResult: currentComponentState.searchResult,
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
