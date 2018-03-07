import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Panel,
  PanelBody,
} from 'react-weui';

import Image from 'components/image';
import TabbarContainer from 'containers/tabbar-container';
import Swiper from 'components/swiper';
import Gallery from 'containers/gallery';

import _actions from './actions';
import _actionsGallery from 'containers/gallery/actions';

import './_home-page.scss';

class HomePage extends React.Component {
  componentWillMount() {
    this.props.fetchRecommendedResult();
  }

  render() {
    let {
      recommendedResult,
      galleryToggle,
    } = this.props;

    return (
      <TabbarContainer className="home-page-container" currentTab="home">
        <Panel>
          <PanelBody>
            {
              recommendedResult.ranking_illusts.length ?
                <Swiper {...{
                  pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true,
                  }
                }}>
                  {
                    recommendedResult.ranking_illusts.map((currentResult, index) => {
                      return (
                        <div
                          key={index}
                          className="ranking-image"
                          onClick={() => {
                            galleryToggle(currentResult.image_urls['large']);
                          }}
                        >
                          <Image src={currentResult.image_urls.medium} />
                        </div>
                      )
                    })
                  }
                </Swiper> : null
            }

            <div className="weui-cells__title title">Recommended illusts</div>
            <div className="recommended-grids">
              {
                recommendedResult.illusts.map((currentResult, index) => {
                  return (
                    <div
                      key={index}
                      className="weui-grid"
                      onClick={() => {
                        galleryToggle(currentResult.image_urls['large']);
                      }}
                    >
                      <div className="flexbox flex-justify-content-center flex-align-items-center weui-grid__icon">
                        <Image src={currentResult.image_urls['square_medium']} />
                      </div>
                      <p className="weui-grid__label">{currentResult.title}</p>
                    </div>
                  );
                })
              }
            </div>
          </PanelBody>
        </Panel>
        {/* Gallery container area */}
        <Gallery />
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
    galleryToggle: bindActionCreators(_actionsGallery.galleryToggle, dispatch),
  };
}

HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export default HomePage;
