import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput
} from 'react-native';

import styles from '../styles';
import {ref} from './auth/authentication';

module.exports = React.createClass({
	getInitialState() {
		return ({
			dataSource: ds.cloneWithRows(''),
			text: '',
			deatilRef ''
		})
	}

	componentDidMount() {
		// this passed props is the uid of the ref that 
		const detailRef = ref.child(this.props.ref_uid);
		this.setState({detailRef})
	}
  
})
