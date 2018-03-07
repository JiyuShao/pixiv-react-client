import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  SearchBar,
  //for display data
  Panel,
  PanelHeader,
  PanelBody,
} from 'react-weui';

import Image from 'components/image';
import InfiniteLoader from 'components/infinite-loader';
import IllustCell from 'components/illust-cell';
import TabbarContainer from 'containers/tabbar-container';
import Gallery from 'containers/gallery';

import './_search-page.scss';

import _actions from './actions';
import _actionsGallery from 'containers/gallery/actions.jsx';

class SearchPage extends React.Component {
  componentWillMount() {
    this.props.fetchTrendingTags();
  }

  render() {

    let {
      tab,
      searchText,
      textChange,
      fetchSearchResult,
      sortOptions,
      searchResult,
      trendingTags,
      galleryToggle,
    } = this.props;

    return (
      <TabbarContainer className="search-page-container" currentTab="search">
        <SearchBar
          className="search-bar"
          placeholder={searchText ? searchText : "Enter keyword"}
          lang={{
            cancel: 'Cancel'
          }}
          onChange={textChange}
          onCancel={textChange}
          onSubmit={(text) => {
            fetchSearchResult({
              text: text,
              sortOptions: sortOptions,
              searchResult: searchResult,
            })
          }}
        />

        <InfiniteLoader
          style={{
            display: (tab === 'result') ? null : 'none',
            height: document.documentElement.clientHeight - document.documentElement.clientWidth * 0.2506  // 0.355 is navbar + search bar + search tab ?vw
          }}
          onLoadMore={() => {
            fetchSearchResult({
              text: searchText,
              sortOptions: sortOptions,
              searchResult: searchResult,
            })
          }}
          // scrollTop={undefined}
          finish={!searchResult.next_url}
        >
          <Panel className="search-result-container">
            <PanelHeader>
              {`Search Key: ${searchText}`}
            </PanelHeader>
            <PanelBody>
              {
                searchResult.records.map((currentResult, index) => {
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
                        galleryToggle(currentResult.image_urls.large);
                      }}
                    />
                  )
                })
              }
            </PanelBody>
          </Panel>
        </InfiniteLoader>

        <div className="weui-grids tag-grids" style={{ display: (tab === 'tags') ? null : 'none' }}>
          {
            trendingTags.map((currentTag, index) => {
              return (
                <span key={index} className="weui-grid" onClick={() => {
                  fetchSearchResult({
                    text: currentTag.tag,
                    sortOptions: sortOptions,
                    searchResult: searchResult,
                  });
                }}>
                  <div className="flexbox flex-justify-content-center flex-align-items-center weui-grid__icon">
                    <Image src={currentTag.illust.image_urls[(index === 0) ? 'medium' : 'square_medium']} />
                  </div>
                  <p className="weui-grid__label">{currentTag.tag}</p>
                </span>
              );
            })
          }
        </div>
        {/* Gallery container area */}
        <Gallery />
      </TabbarContainer>
    );
  }
}

const mapStateToProps = (state) => {
  let currentComponentState = state['search-page'];

  return {
    tab: currentComponentState.tab,
    trendingTags: currentComponentState.trendingTags,
    searchText: currentComponentState.searchText,
    sortOptions: currentComponentState.sortOptions,
    searchResult: currentComponentState.searchResult,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrendingTags: bindActionCreators(_actions.fetchTrendingTags, dispatch),
    textChange: bindActionCreators(_actions.textChange, dispatch),
    fetchSearchResult: bindActionCreators(_actions.fetchSearchResult, dispatch),
    galleryToggle: bindActionCreators(_actionsGallery.galleryToggle, dispatch),
  };
}

SearchPage = connect(mapStateToProps, mapDispatchToProps)(SearchPage);
export default SearchPage;
