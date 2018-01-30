import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(sessionStorage.getItem('profile'));

  return <Route {...rest} render={props => (
    sessionStorage.getItem('profile')
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
};

export default PrivateRoute;
