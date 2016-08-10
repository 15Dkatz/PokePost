import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import styles from '../styles';
import {firebaseApp} from './auth/authentication';

module.exports = React.createClass({
  getInitialState() {
    return({
      displayName: '',
      uid: '',
      title: '',
    })
  },

  componentDidMount() {
    let user = firebaseApp.auth().currentUser;

    //grab uid

    if (!user.displayName) {
      this.props.navigator.push({
        name: 'chooseName'
      })
    } else {
      // proceed normally with application
      let {displayName, uid} = user;
      this.setState({
        displayName,
        uid
      })
    }
  },


  signOut() {
    // sign out the user
    firebaseApp.auth().signOut()
      .then(() => {
        // Sign out successful
        this.props.navigator.popToTop();
      }, (error) => {
        console.log(error);
      })
  },

  toRef(title) {
    let placeholder = '';

    if (title == 'Tips') {
      placeholder = 'Got some advice?';
    } else if (title == 'Jokes') {
      placeholder = 'How about some humor?';
    } else if (title == 'Questions') {
      placeholder = 'Something on your mind?'
    }

    let {displayName, uid} = this.state;

    this.props.navigator.push({
      name: 'appRef',
      displayName,
      uid,
      section_title: title,
      placeholder
    })
  },

  renderSection(title) {
    // test the import statement.
    let source='';
    if (title == 'Tips') {
      source = require('../resources/mystic.png');
    } else if (title == 'Jokes') {
      source = require('../resources/valor.png');
    } else if (title == 'Questions') {
      source = require('../resources/instinct.png');
    } else {
      source = require('../resources/mystic.png');
    };
    return (
        <Image
          style={styles.section_img}
          source={source}
        >
          <TouchableOpacity style={styles.section}
            onPress={() => this.toRef(title)}
          >
            <Text style={styles.section_title}>
              {title}
            </Text>
          </TouchableOpacity>
        </Image>
    )
  },

  render() {
    return (
      <View style={styles.flexContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.signOut()}
          >
            <Text style={styles.header_text}>
              Sign out
            </Text>
          </TouchableOpacity>
          <Text style={styles.header_text}>
            {this.state.displayName}
          </Text>
        </View>
        <View style={styles.body}>
          {this.renderSection('Tips')}
          {this.renderSection('Jokes')}
          {/*Change Questions to Snaps once you have pictures figured out*/}
          {this.renderSection('Questions')}
        </View>
      </View>
    )
  }
})
