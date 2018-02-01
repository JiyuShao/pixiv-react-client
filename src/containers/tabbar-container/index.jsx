import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Tab, TabBody, TabBar, TabBarItem, TabBarIcon, TabBarLabel, Article } from 'react-weui';

import './_tabbar-container.scss';

class TabbarContainer extends React.Component {
  static defaultProps = {
    currentTab: 'home'
  }

  render() {
    return (
      <Tab className="main-page-container">
        <TabBody>
          <Article>
            {this.props.children}
          </Article>
        </TabBody>

        <TabBar>
          <TabBarItem
            active={this.props.currentTab === 'home'}
            onClick={() => {
              this.props.push('/home');
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
              this.props.push('/search');
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
              this.props.push('/profile');
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
    );
  }
}

const mapStateToProps = (state) => {
  let currentComponentState = state['search-page'];
  return {
    trendingTags: currentComponentState.trendingTags,
    searchText: currentComponentState.searchText,
    searchResult: currentComponentState.searchResult,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    push: bindActionCreators(push, dispatch),
  };
}

TabbarContainer = connect(mapStateToProps, mapDispatchToProps)(TabbarContainer);

export default TabbarContainer;
