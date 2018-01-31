// login-page is not using react-redux
import React from 'react';
import WeForm from 'components/we-form';
import Toast from 'components/toast';
import config from 'config';

import './_login-page.scss';

class LoginPage extends React.Component {
  submit = (formData) => {
    Toast.loading('Loading...');
    fetch(config.API_ROOT + '/login', { //TODO: put login fetch to utils/api
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then((res) => res.json()).then((res) => {
      console.log(this.props);

      if (res.status === 'success') {
        sessionStorage.setItem('profile', JSON.stringify(res.response));
        Toast.success('Login succeed!', () => {
          this.props.history.push('/home');
        });
      } else {
        throw new Error('Login failed!');
      }
    }).catch((error) => {
      Toast.cancel(error);
      this.setState({
        formData: {}
      })
    });
  }

  render() {
    let schema = [
      {
        properties: [
          {
            id: 'username',
            label: 'Username',
            type: 'text',
            default: '',
            placeholder: 'Enter your username',
            rule: 'required|between:2,15|string'
          },
          {
            id: 'password',
            label: 'Password',
            type: 'password',
            default: '',
            placeholder: 'Enter your password',
            rule: 'required'
          }
        ]
      }
    ];
    let form = {
      onError: (errors) => {
        Toast.forbidden(Object.values(errors[0])[0]);
      },
      actions: [
        {
          label: 'Login',
          type: 'primary',
          onClick: (formData) => this.submit(formData),
        }
      ]
    };

    return (
      <div className="login-container">
        <div className='flexbox flex-direction-column flex-align-items-center login-header'>
          <img className="logo" src="/images/pixiv_logo.svg" alt="pixiv_logo"/>
          <h2 style={{ textAlign: 'center' }}>Login Page</h2>
        </div>

        <WeForm schema={schema} form={form}/>
      </div>
    );
  }
}

export default LoginPage;
