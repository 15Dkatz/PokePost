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
import appRefDetail from './components/app-ref-detail';

const routes = {
  signIn,
  signUp,
  chooseName,
  forgotPassword,

  app,
  appRef,
  appRefDetail
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
    let {displayName, uid, placeholder, section_title, ref_uid, author_uid, item_title, item_author} = route;

    return (
      <Component
        navigator={navigator}
        displayName={displayName}
        uid={uid}
        //app-ref
        section_title={section_title}
        placeholder={placeholder}
        //app-ref-detail
        ref_uid={ref_uid}
        author_uid={author_uid}

        item_title={item_title}
        item_author={item_author}
      />
    )
  }
})
