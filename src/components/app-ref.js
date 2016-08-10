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
      dataSource: ds.cloneWithRows([]),
      text: '',
      appRef: ''
    })
  },

  componentDidMount() {
    const appRef = ref.child(this.props.section_title);
    this.setState({appRef});
    this.listenForItems(appRef);
  },

  listenForItems(ref) {
    ref.on('value', snap => {
      let items = [];
      snap.forEach(child => {
        items.push({
          item_title: child.val().item_title,
          item_author: child.val().author,
          key: child.getKey()
        })
      })
      let dataSource = ds.cloneWithRows(items);
      this.setState({dataSource});
    })
  },

  postItem() {
    this.state.appRef.push({
      item_title: this.state.text,
      item_author: this.props.displayName,
      author_uid: this.props.uid,
      timeStamp: new Date().toString()
    })
  },

  detail(key, item_title, item_author) {
    let {displayName, section_title} = this.props;
    let route = {
      name: 'appRefDetail',
      // uid of the specific item
      author_uid: this.props.uid,
      displayName,
      // title of section as in TIPS, JOKES, or QUESTIONS -> Change to section_title
      section_title,
      ref_uid: key,
      item_title,
      item_author
    };
    this.props.navigator.push(route);
  },

  renderRow(data) {
    // data.key = the firebase uid of the item
    let {key, item_title, item_author} = data;
    return (
      <View
        style={styles.row_with_icon}
      >
        <View style={styles.row_side}>
          <Text style={styles.row_icon}>
            &#9825;
          </Text>
        </View>
        <TouchableOpacity
          style={styles.row_middle}
          onPress={() => this.detail(key, item_title, item_author)}
        >
          <Text style={styles.row_title}>
            {data.item_title}
          </Text>
          <Text>
            {data.item_author}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row_side}
          onPress={() => this.detail(key, item_title, item_author)}
        >
          <Text style={styles.row_icon}>
            >
          </Text>
        </TouchableOpacity>
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
