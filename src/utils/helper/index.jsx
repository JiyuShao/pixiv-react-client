import _ from 'lodash';
import config from 'config';

class Helper {
  constructor() {
    this.profile = JSON.parse(sessionStorage.getItem('profile'));
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
  }

  oauthApi (url, options, refreshFlag = true) {
    if (!sessionStorage.getItem('profile')) {
      return Promise.reject('Please Login First!');
    }

    let defaultOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.profile.access_token}`
      }
    }

    options = _.defaultsDeep(options, defaultOptions); //The destination object,  The source objects

    return fetch(url, options).then((res) => res.json()).then((res) => {
      console.log(url, res);
      if (res.status === 'success') {
        return res.response;
      } else if (res.message.statusCode === 400) { // access token expired
        if (refreshFlag) {
          return this.refreshAccessToken(refreshFlag).then(() => { // call api again
            return this.oauthApi(url, {
              ...options,
              ...{
                headers: {
                  'Authorization': `Bearer ${this.profile.access_token}` //refresh header authorization
                }
              }
            }, false); //the 3rd parameter is whether refresh access token
          });
        } else {
          throw new Error(`${options.method} ${url} Failed`);
        }
      } else {
        throw new Error(`${options.method} ${url} Failed!`);
      }
    });
  }

  get(url) {
    console.log(url);
    return this.oauthApi(config.API_ROOT + url);
  }

  post (url, postBody) {
    console.log(url, postBody);
    return this.oauthApi(config.API_ROOT + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody)
    })
  }

  refreshAccessToken() {
    fetch(config.API_ROOT + '/login_refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "refresh_token": this.profile.refresh_token
      })
    }).then((res) => res.json()).then((res) => {
      if (res.status === 'success') {
        this.profile = res.response;
        sessionStorage.setItem('profile', JSON.stringify(this.profile));
        return this.profile;
      } else {
        throw new Error('Refresh access token failed');
      }
    });
  }
}

let helper = new Helper();
export default helper;
