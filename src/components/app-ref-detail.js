import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  ListView
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

	// make sure app ref passes the author and author_uid
	postItem() {
		this.state.appRef.push({
			item_title: this.state.text,
			author: this.props.displayName,
			author_uid: this.props.uid,
			timeStamp: new Date().toString()
		})
	},

	renderRow(data) {
		return (
			<View style={styles.row}>
				<Text style={styles.row_title}>
					{data.item_title}
				</Text>
				<Text>
					{data.author}
				</Text>
			</View>
		)
	},


	render() {
		return (
			<View sty;e={styles.refContainer}>
				<View style={styles.header}>
					<TouchableOpacity
						onPress={()=>this.props.navigator.pop()}
					>
						<Text style={styles.header_text}>
							Back
						</Text>
					</TouchableOpacity>
					<View style={styles.refBody}>
						<TextInput 
							style={styles.input}
							// possible to have a placeholder props
							placeholder='Add your input'
							onChangeText={(text) => this.setState(text)}
							onEndEditing={() => this.postItem()}
						/>
						<ListView 
							style={styles.list}
							enableEmptySections={true}
							dataSource={this.state.dataSource}
							renderRow={(rowData) => this.renderRow(rowData)}
						/>
					</View>
				</View>
			</View>
		)
	}
	

  
})
