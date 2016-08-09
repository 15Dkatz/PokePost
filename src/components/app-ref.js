import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView
} from 'react-native';

import styles from '../styles';
import {ref} from './auth/authentication';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});

module.exports = React.createClass({
  getInitialState() {
    return ({
      dataSource: ds.cloneWithRows(''),
      text: '',
      appRef: ''
    })
  },

  componentDidMount() {
    const appRef = ref.child(this.props.title);
    this.setState({appRef});
    this.listenForItems(appRef);
  },

  listenForItems(ref) {
    ref.on('value', snap => {
      let items = [];
      snap.forEach(child => {
        items.push({
          item_title: child.val().item_title,
          author: child.val().author
        })
      })
      this.setState({dataSource: ds.cloneWithRows(items)});
    })
  },

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
      <View style={styles.refContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigator.pop()}
          >
            <Text style={styles.header_text}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.refBody}>
          <TextInput
            style={styles.input}
            placeholder={this.props.placeholder}
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
