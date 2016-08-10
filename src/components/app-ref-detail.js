// flagging

import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ListView
} from 'react-native';

import styles from '../styles';
import {ref} from './auth/authentication';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});

module.exports = React.createClass({
	getInitialState() {
		return ({
			dataSource: ds.cloneWithRows([]),
			text: '',
			detailRef: ''
		})
	},

	componentDidMount() {
    console.log('ref_uid', this.props.ref_uid);
		// this passed props is the uid of the ref that
		// make sure that app-ref passes the row_uid
		const detailRef = ref.child(this.props.section_title).child(this.props.ref_uid).child('comments');
		this.setState({detailRef})
		this.listenForItems(detailRef);
	},

	listenForItems(ref) {
		ref.on('value', snap => {
			let items = [];
			snap.forEach(child => {
        let {item_title, author} = child.val();
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
		this.state.detailRef.push({
			item_title: this.state.text,
			author: this.props.displayName,
			author_uid: this.props.author_uid,
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

  flag() {
    console.log('flagging');
  },


	render() {
		return (
			<View style={styles.refContainer}>
				<View style={styles.header}>
					<TouchableOpacity
						onPress={()=>this.props.navigator.pop()}
					>
						<Text style={styles.header_text}>
							Back
						</Text>
					</TouchableOpacity>
          <TouchableOpacity
						onPress={()=>this.flag()}
					>
						<Text style={styles.header_text}>
							Flag
						</Text>
					</TouchableOpacity>
        </View>
				<View style={styles.refBody}>
          <Text style={styles.detail_title}>
            {this.props.item_title}
          </Text>
          <Text style={styles.detail_subtitle}>
            {this.props.item_author}
          </Text>
					<TextInput
						style={styles.input}
						// possible to have a placeholder props
						placeholder='Your thoughts...'
						onChangeText={(text) => this.setState({text})}
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
		)
	}



})
