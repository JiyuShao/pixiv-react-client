import React from 'react';

import WeForm from 'components/we-form';
import Toast from 'components/toast';

import './_login-page.scss';

class LoginPage extends React.Component {
  constructor() {
    super();
    Toast.success({
      content: 'asdfsad',
      duration:0
    });
  }

  submit = (formData) => {
    console.log(formData);
    return;

    Toast.loading('Loading...');
    fetch(process.env.API_URL + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'email',
        password: 'password'
      })
    }).then((res) => res.json()).then((res) => {
      if (res.status === 'success') {
        sessionStorage.setItem('loggedin', 'true');
        sessionStorage.setItem('profile', JSON.stringify(res.response));
        Toast.success('Login succeed!', () => {
          this.props.history.push('/');
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

  onErrorClick = (currentField) => {
    if (this.state.validationError
      && this.state.validationError[currentField]) {
      Toast.cancel(this.state.validationError[currentField].errors[0].message);
    }
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
        <div className='flexbox flex-direction-column flex-justify-content-center login-header'>
          <img className="logo" src="/images/pixiv_logo.svg"/>
          <h2 style={{ textAlign: 'center' }}>Login Page</h2>
        </div>

        <WeForm schema={schema} form={form}/>
      </div>
    );
  }
}

export default LoginPage;
