import _ from 'lodash';
import React from 'react'; import {
  Link
} from 'react-router-dom';
import { Tab, TabBody, TabBar, TabBarItem, TabBarIcon, TabBarLabel, Article } from 'react-weui';

import Toast from 'components/toast';
import helper from 'utils/helper';
import ProfilePage from 'containers/profile-page';
import SearchPage from 'containers/search-page';

class MainPageContainer extends React.Component {
  constructor(props) {
    super(props);

    let currentTab = this.props.location.pathname.slice(1);
    let availableTabs = ['home', 'search', 'profile'];
    let profile = JSON.parse(sessionStorage.getItem('profile'));

    this.state = {
      profile: profile,
      currentTab: availableTabs.includes(currentTab) ? currentTab : 'home',
    };
  }

  clickTabHandler(tab) {
    console.log('clickTabHandler', tab);

    this.setState({
      ...this.state,
      currentTab: tab
    });
    // this.props.history.push(`/${tab}`); //TODO: this will rerender whole page, need to fix that
  }

  render() {
    return (
      <div className="container">
        <Tab>
          <TabBody>
            <Article style={{ display: this.state.currentTab === 'home' ? null : 'none' }}>
              <h1>Home Page</h1>
            </Article>
            <Article style={{ display: this.state.currentTab === 'search' ? null : 'none' }}>
              <SearchPage />
            </Article>
            <Article style={{ display: this.state.currentTab === 'profile' ? null : 'none' }}>
              <ProfilePage user={{
                ...this.state.profile.user, ...{
                  profile_image_url: this.state.profile.user.profile_image_urls.px_170x170
                }
              }} />
            </Article>
          </TabBody>

          <TabBar>
            <TabBarItem
              active={this.state.currentTab === 'home'}>
              <Link to="/home">
                <TabBarIcon>
                  <img src={
                    this.state.currentTab === 'home' ? 'https://png.icons8.com/ios/50/09bb07/home-filled.png' : 'https://png.icons8.com/ios/50/666666/home.png'
                  } alt="home" />
                </TabBarIcon>
                <TabBarLabel>Home</TabBarLabel>
              </Link>
            </TabBarItem>

            <TabBarItem
              active={this.state.currentTab === 'search'}>
              <Link to="/search">
                <TabBarIcon>
                  <img src={
                    this.state.currentTab === 'search' ? 'https://png.icons8.com/ios/50/09bb07/search-filled.png' : 'https://png.icons8.com/ios/50/666666/search.png'
                  } alt="search" />
                </TabBarIcon>
                <TabBarLabel>Search</TabBarLabel>
              </Link>
            </TabBarItem>

            <TabBarItem
              active={this.state.currentTab === 'profile'}>
              <Link to="/profile">
                <TabBarIcon>
                  <img src={
                    this.state.currentTab === 'profile' ? 'https://png.icons8.com/ios/50/09bb07/gender-neutral-user-filled.png' : 'https://png.icons8.com/ios/50/666666/gender-neutral-user.png'
                  } alt="profile" />
                </TabBarIcon>
                <TabBarLabel>Profile</TabBarLabel>
              </Link>
            </TabBarItem>

          </TabBar>
        </Tab>
      </div>
    );
  }
}

export default MainPageContainer;
