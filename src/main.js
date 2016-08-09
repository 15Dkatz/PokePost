import React from 'react';
import {
  Navigator
} from 'react-native';

import signIn from './components/auth/signIn';
import signUp from './components/auth/signUp';
import chooseName from './components/auth/chooseName';
import forgotPassword from './components/auth/forgot-password';

import app from './components/app';
import appRef from './components/app-ref';

const routes = {
  signIn,
  signUp,
  chooseName,
  forgotPassword,

  app,
  appRef
}

module.exports = React.createClass({
  render() {
    return (
      <Navigator
        initialRoute={{name: 'signIn'}}
        renderScene={this.renderScene}
      />
    )
  },

  renderScene(route, navigator) {
    let Component = routes[route.name];
    let {displayName, uid, placeholder, title} = route;

    return (
      <Component
        navigator={navigator}
        displayName={displayName}
        uid={uid}
        //app-ref
        title={title}
        placeholder={placeholder}
      />
    )
  }
})
