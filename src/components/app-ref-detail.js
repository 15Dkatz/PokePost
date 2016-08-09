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
	},

	componentDidMount() {
		// this passed props is the uid of the ref that 
		// make sure that app-ref passes the row_uid
		const detailRef = ref.child(this.props.ref_uid);
		this.setState({detailRef})
		this.listenForItems(detailRef);
	},

	listenForItems(ref) {
		ref.on('value', snap => {
			let items = [];
			let {item_title, author} = child.val();
			snap.forEach(child => {
				items.push({
					item_title,
					author
				})
			})
			this.setState({dataSource: ds.cloneWithRows(items)});
		})
	},

	

  
})
