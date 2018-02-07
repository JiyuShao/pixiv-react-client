import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Panel,
  PanelHeader,
  PanelBody,
} from 'react-weui';

import Image from 'components/image';
import InfiniteLoader from 'components/infinite-loader';
import IllustCell from 'components/illust-cell';
import TabbarContainer from 'containers/tabbar-container';

import _actions from './actions';

class HomePage extends React.Component {
  componentWillMount() {
    this.props.fetchRecommendedResult();
  }

  render() {
    return (
      <TabbarContainer className="home-page-container" currentTab="home">
        <InfiniteLoader
          style={{
            height: document.documentElement.clientHeight - document.documentElement.clientWidth * 0.1307  // 0.355 is navbar + search bar + search tab ?vw
          }}
          onLoadMore={() => {
            this.props.fetchRecommendedResult({sortOptions: this.props.sortOptions})
          }}
          // scrollTop={undefined}
          finish={true}
        >
          <Panel className="search-result-container">
            <PanelBody>
              {
                this.props.recommendedResult.ranking_illusts.map((currentResult, index) => {
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
      </TabbarContainer>
    );
  }
}

const mapStateToProps = (state) => {
  let currentComponentState = state['home-page'];
  return {
    recommendedResult: currentComponentState.recommendedResult,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecommendedResult: bindActionCreators(_actions.fetchRecommendedResult, dispatch),
  };
}

HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export default HomePage;
