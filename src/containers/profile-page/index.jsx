import React from 'react';
import PropTypes from 'prop-types';
import {
  Cells, Cell, CellBody, CellsTitle, CellFooter
} from 'react-weui';

import './_profile-page.scss';

class ProfilePage extends React.Component {
  static defaultProps = {
    user: {
      name: 'Name',
      id: 666666,
      mail_address: '',
      profile_image_url: 'https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png',
    }
  };

  static propTypes = {
    user: PropTypes.object,
  };

  render() {
    return (
      <div className="container">
        <div className="flexbox flex-direction-column flex-align-items-center profile-header">
          <div className="background-blur" style={{ backgroundImage: `url(${this.props.user.profile_image_url})` }}>

          </div>
          <img className="profile-header-image" src={this.props.user.profile_image_url} alt="profile_image_url" />
          <div className="profile-header-userdata">
            <span className="username">{`${this.props.user.name} (id: ${this.props.user.id})`}</span>
            <p className="email">{`Email: ${this.props.user.mail_address}`}</p>
          </div>
        </div>
        <CellsTitle>Profile details</CellsTitle>
        <Cells>
          <Cell>
            <CellBody>Name</CellBody>
            <CellFooter>{this.props.user.name}</CellFooter>
          </Cell>
          <Cell>
            <CellBody>User Id</CellBody>
            <CellFooter>{this.props.user.id}</CellFooter>
          </Cell>
          <Cell>
            <CellBody>Email</CellBody>
            <CellFooter>{this.props.user.mail_address}</CellFooter>
          </Cell>
          <Cell>
            <CellBody>Is Premium</CellBody>
            <CellFooter>{this.props.user.is_premium ? 'Yes' : 'No'}</CellFooter>
          </Cell>
        </Cells>
      </div>
    );
  }
}

export default ProfilePage;
