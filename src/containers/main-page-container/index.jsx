import _ from 'lodash';
import React from 'react';
import { Tab, TabBody, TabBar, TabBarItem, TabBarIcon, TabBarLabel, Article } from 'react-weui';

import Toast from 'components/toast';
import helper from 'utils/helper';
import ProfilePage from 'containers/profile-page';

class MainPageContainer extends React.Component {
  constructor(props) {
    super(props);

    let currentTab = this.props.location.pathname.slice(1);
    let availableTabs = ['home', 'search', 'profile'];
    let profile = JSON.parse(sessionStorage.getItem('profile'));

    this.state = {
      profile: profile,
      currentTab: availableTabs.includes(currentTab) ? currentTab : 'home',
      tabData: {
        home: {},
        search: {},
        profile: {}
      }
    };

    console.log('123');

    Object.keys(this.state.tabData).map((currentTab) => {
      this.initTabData(currentTab, true);
    });
  }

  async initTabData(tab, constructFlag = false) {
    console.log(this.state.tabData.profile);
    let currentTabData = {};
    if (tab === 'profile') {

      if (_.isEmpty(this.state.tabData.profile)) {
        try {
          currentTabData = await helper.get(`/user/detail?user_id=${this.state.profile.user.id}`);
        } catch (error) {
          console.log(error);
          Toast.cancel(error);
        }
      }
    }
    if (constructFlag) {
      this.state.tabData[tab] = currentTabData;
    } else {
      this.setState({
        ...this.state,
        ...{
          tabData: {
            ...this.state.tabData,
            ...{
              [tab]: currentTabData
            }
          }
        }
      })
    }
  }

  clickTabHandler(tab) {
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
              <h1>Search Page</h1>
            </Article>
            <Article style={{ display: this.state.currentTab === 'profile' ? null : 'none' }}>
              <ProfilePage user={{
                ...this.state.profile.user, ...{
                  profile_image_url: this.state.profile.user.profile_image_urls.px_170x170
                }
              }} userDetail={this.state.tabData.profile.userDetail} />
            </Article>
          </TabBody>

          <TabBar>
            <TabBarItem
              active={this.state.currentTab === 'home'}
              onClick={() => {
                this.clickTabHandler('home');
              }}>
              <TabBarIcon>
                <img src={
                  this.state.currentTab === 'home' ? 'https://png.icons8.com/ios/50/09bb07/home-filled.png' : 'https://png.icons8.com/ios/50/666666/home.png'
                } alt="home" />
              </TabBarIcon>
              <TabBarLabel>Home</TabBarLabel>
            </TabBarItem>

            <TabBarItem
              label="search"
              active={this.state.currentTab === 'search'}
              icon={<img src={
                this.state.currentTab === 'search' ? 'https://png.icons8.com/ios/50/09bb07/search-filled.png' : 'https://png.icons8.com/ios/50/666666/search.png'
              } alt="search" />}
              onClick={() => {
                this.clickTabHandler('search');
              }}
            />

            <TabBarItem
              label="profile"
              active={this.state.currentTab === 'profile'}
              icon={<img src={
                this.state.currentTab === 'profile' ? 'https://png.icons8.com/ios/50/09bb07/gender-neutral-user-filled.png' : 'https://png.icons8.com/ios/50/666666/gender-neutral-user.png'
              } alt="profile" />}
              onClick={() => {
                this.clickTabHandler('profile');
              }}
            />
          </TabBar>
        </Tab>
      </div>
    );
  }
}

export default MainPageContainer;
