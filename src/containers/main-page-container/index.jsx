import _ from 'lodash';
import React from 'react'; import {
  Link
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Tab, TabBody, TabBar, TabBarItem, TabBarIcon, TabBarLabel, Article } from 'react-weui';

import Toast from 'components/toast';
import ProfilePage from 'containers/profile-page';
import SearchPage from 'containers/search-page';
import _actions from './actions';

class MainPageContainer extends React.Component {
  // get user profile from sessionStorage
  profile = JSON.parse(sessionStorage.getItem('profile'));

  clickTabHandler(tab) {
    this.props.toggleTab(tab)
  }

  render() {
    return (
      <div className="container">
        <Tab>
          <TabBody>
            <Article style={{ display: this.props.currentTab === 'home' ? null : 'none' }}>
              <h1>Home Page</h1>
            </Article>
            <Article style={{ display: this.props.currentTab === 'search' ? null : 'none' }}>
              <SearchPage />
            </Article>
            <Article style={{ display: this.props.currentTab === 'profile' ? null : 'none' }}>
              <ProfilePage user={{
                ...this.profile.user, ...{
                  profile_image_url: this.profile.user.profile_image_urls.px_170x170
                }
              }} />
            </Article>
          </TabBody>

          <TabBar>
            <TabBarItem
              active={this.props.currentTab === 'home'}
              onClick={() => {
                this.clickTabHandler('home');
              }}>
              <TabBarIcon>
                <img src={
                  this.props.currentTab === 'home' ? 'https://png.icons8.com/ios/50/09bb07/home-filled.png' : 'https://png.icons8.com/ios/50/666666/home.png'
                } alt="home" />
              </TabBarIcon>
              <TabBarLabel>Home</TabBarLabel>
            </TabBarItem>

            <TabBarItem
              active={this.props.currentTab === 'search'}
              onClick={() => {
                this.clickTabHandler('search');
              }}>
              <TabBarIcon>
                <img src={
                  this.props.currentTab === 'search' ? 'https://png.icons8.com/ios/50/09bb07/search-filled.png' : 'https://png.icons8.com/ios/50/666666/search.png'
                } alt="search" />
              </TabBarIcon>
              <TabBarLabel>Search</TabBarLabel>
            </TabBarItem>

            <TabBarItem
              active={this.props.currentTab === 'profile'}
              onClick={() => {
                this.clickTabHandler('profile');
              }}>
              <TabBarIcon>
                <img src={
                  this.props.currentTab === 'profile' ? 'https://png.icons8.com/ios/50/09bb07/gender-neutral-user-filled.png' : 'https://png.icons8.com/ios/50/666666/gender-neutral-user.png'
                } alt="profile" />
              </TabBarIcon>
              <TabBarLabel>Profile</TabBarLabel>
            </TabBarItem>

          </TabBar>
        </Tab>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { currentTab: state['main-page-container'].currentTab };
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTab: bindActionCreators(_actions.toggleTab, dispatch)
  };
}

MainPageContainer = connect(mapStateToProps, mapDispatchToProps)(MainPageContainer);
export default MainPageContainer;
