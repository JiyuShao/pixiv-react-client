import React from 'react';
import {
  Cells, Cell, CellBody, CellsTitle, CellFooter
} from 'react-weui';

import Image from 'components/image';
import TabbarContainer from 'containers/tabbar-container';
import './_profile-page.scss';

class ProfilePage extends React.Component {
  componentWillMount() {
    let profile = JSON.parse(sessionStorage.getItem('profile'));
    this.user = {
      ...profile.user, ...{
        profile_image_url: profile.user.profile_image_urls.px_170x170
      }
    }
  }

  render() {
    return (
      <TabbarContainer currentTab="profile">
        <div className="flexbox flex-direction-column flex-align-items-center profile-header">
          <div className="background-blur" style={{ backgroundImage: `url(${this.user.profile_image_url})` }}>

          </div>
          <Image className="profile-header-image" src={this.user.profile_image_url} alt="profile_image_url" />
          <div className="profile-header-userdata">
            <span className="username">{`${this.user.name} (id: ${this.user.id})`}</span>
            <p className="email">{`Email: ${this.user.mail_address}`}</p>
          </div>
        </div>
        <CellsTitle>Profile details</CellsTitle>
        <Cells>
          <Cell>
            <CellBody>Name</CellBody>
            <CellFooter>{this.user.name}</CellFooter>
          </Cell>
          <Cell>
            <CellBody>User Id</CellBody>
            <CellFooter>{this.user.id}</CellFooter>
          </Cell>
          <Cell>
            <CellBody>Email</CellBody>
            <CellFooter>{this.user.mail_address}</CellFooter>
          </Cell>
          <Cell>
            <CellBody>Is Premium</CellBody>
            <CellFooter>{this.user.is_premium ? 'Yes' : 'No'}</CellFooter>
          </Cell>
        </Cells>
      </TabbarContainer>
    );
  }
}

export default ProfilePage;
