// flagging

// FIGURE OUT WHY FLAGGING ISNT REAL TIME. NEED TO ADD TO LISTENER
// CHECK if POPTOROUTE works

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
			detailRef: '',
      baseRef: '',
      flagged: false,
      flagsLength: 0
		})
	},


	componentDidMount() {
    console.log('ref_uid', this.props.ref_uid);
		// this passed props is the uid of the ref that
		// make sure that app-ref passes the row_uid
    const baseRef = ref.child(this.props.section_title).child(this.props.ref_uid);
		const detailRef = baseRef.child('comments');
  	this.setState({detailRef, baseRef});
    this.flag(false);
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
      let dataSource = ds.cloneWithRows(items);
			this.setState({dataSource});
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

  flag(active) {
    // why does it take 2 presses to work?

    // launch a whole new flagging request page
    let flagsRef = ref.child(this.props.section_title).child(this.props.ref_uid).child('flags');

    let flagger = false;
    let flagsLength = 0;

    flagsRef.once('value', snapshot => {
      snapshot.forEach(child => {
        let {uid} = child.val();
        let key = child.getKey();

        flagsLength++;

        if (uid == this.props.uid) {
          flagger = true;
          // remove
          this.setState({flagged: true});
          if (active) {
            this.setState({flagged: false});
            let uidRef = flagsRef.child(key);
            flagsLength--;
            uidRef.remove()
              .then(() => {
                console.log('Remove succeeded.');
              })
              .catch((error) => {
                console.log('Remove failed: ' + error.message);
              })
          }
        }
        this.setState({flagsLength});
      })

      if (!flagger) {
        if (active) {
          flagsRef.push({
            uid: this.props.uid
          })
          flagsLength++;
          this.setState({
            flagged: true,
            flagsLength
          })
        }
      }
    })
    // once the flags length extends past 5, remove the ref and popToApp.

    if (this.state.flagsLength > 4) {
      let flaggedRef = ref.child(this.props.section_title).child(this.props.ref_uid);
      flaggedRef.remove()
        .then(() => {
          console.log('Remove succeeded.');
          // pop to app
          // FIGURE OUT A BETTER METHOD THAN POP TO topics
          this.props.navigator.popToRoute({
            name: 'app'
          });
        })
        .catch((error) => {
          // convert to template string
          console.log(`Remove failed: ${error.message}`);
        })
    }


  },


	render() {
    // if this.props.uid is amongst the flaggers, then set button to unflag

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
						onPress={()=>this.flag(true)}
					>
						<Text style={[styles.header_text, styles.danger]}>
							{this.state.flagged ? 'Unflag' : 'Flag'} {this.state.flagsLength}/5
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
