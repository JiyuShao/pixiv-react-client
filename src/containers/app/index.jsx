import React from 'react';
import { Route } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import _reducers from './reducers' // Or wherever you keep your reducers
import _sagas from './sagas';

import PrivateRoute from 'components/private-route';
import LoginPage from 'containers/login-page';
import HomePage from 'containers/home-page';
import SearchPage from 'containers/search-page';
import ProfilePage from 'containers/profile-page';

import 'weui';
import 'react-weui/build/packages/react-weui.css';
import 'styles/_common.scss';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ..._reducers,
    router: routerReducer,
  }),
  applyMiddleware(middleware, sagaMiddleware, logger)
)

// then run the saga
sagaMiddleware.run(_sagas);

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        { /* ConnectedRouter will use the store from Provider automatically, require react-router-redux@next
            https://github.com/ReactTraining/react-router/issues/4769
          */ }
        <ConnectedRouter history={history}>
          <div>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute path="/home" component={HomePage} />
            <PrivateRoute path="/search" component={SearchPage} />
            <PrivateRoute path="/profile" component={ProfilePage} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
