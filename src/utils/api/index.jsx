import _ from 'lodash';
import config from 'config';

function oauthApi(url, options, refreshFlag = true) {
  url = config.API_ROOT + _.replace(url, config.API_ROOT, '');
  let profile = {};
  if (!sessionStorage.getItem('profile')) {
    return Promise.reject('Please Login First!');
  } else {
    profile = JSON.parse(sessionStorage.getItem('profile'));
  }

  let defaultOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${profile.access_token}`
    }
  }

  options = _.defaultsDeep(options, defaultOptions); //The destination object,  The source objects

  return fetch(url, options).then((res) => res.json()).then((res) => {
    console.log(url, res);
    if (res.status === 'success') {
      return res.response; //we didn't return status when success
    } else if (res.message.statusCode === 400) { // access token expired
      if (refreshFlag) {
        return refreshAccessToken(profile.refresh_token).then((newProfile) => { // call api again
          return oauthApi(url, options, false); //the 3rd parameter is whether refresh access token
        });
      } else {
        throw new Error(`${options.method} ${url} Failed`);
      }
    } else {
      throw new Error(`${options.method} ${url} Failed!`);
    }
  });
}

function get(url) {
  console.log(url);
  return oauthApi(url);
}

function post(url, postBody) {
  console.log(url, postBody);
  return oauthApi(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postBody)
  })
}

function refreshAccessToken(refresh_token) {
  return fetch(config.API_ROOT + '/login_refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "refresh_token": refresh_token
    })
  }).then((res) => res.json()).then((res) => {
    if (res.status === 'success') {
      let profile = res.response;
      sessionStorage.setItem('profile', JSON.stringify(profile));
      return profile;
    } else {
      throw new Error('Refresh access token failed');
    }
  });
}

export default {
  get,
  post,
};
