// Give the user the option to ORGANIZE appRefs
// either by timestamp, or either by likes.


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
      uid: '',
      text: '',
      appRef: '',
      favorited: false
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
        let favoritersSnap = child.val().favoriters;
        // console.log('favoritersSnap keys', Object.values(favoritersSnap));
        let favoritersKeys = [];
        if (favoritersSnap) {
          favoritersKeys = Object.values(favoritersSnap);
        }
        let favoriters = [];
        favoritersKeys.map(child => {
          favoriters.push(child.uid);
        })

        items.push({
          item_title: child.val().item_title,
          item_author: child.val().item_author,
          key: child.getKey(),
          favoriters
        });
      })
      // figure out warningx..
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
    let {uid, displayName, section_title} = this.props;
    let route = {
      name: 'appRefDetail',
      // uid of the specific item

      author_uid: this.props.uid,
      displayName,
      uid,
      // title of section as in TIPS, JOKES, or QUESTIONS -> Change to section_title
      section_title,
      ref_uid: key,
      item_title,
      item_author
    };
    this.props.navigator.push(route);
  },

  favorite(key) {
    // actual row accessed by key
    let rowRef = this.state.appRef.child(key).child('favoriters');
    // use a snap of rowRef to check if this uid has already favorited
    // if so show a full Heart
    // else push the uid to the list.
    let favoriter = false;

    rowRef.once('value')
      .then((snapshot) => {
        // because each child is within to an anonymous key
        snapshot.forEach(child => {
          let {uid} = child.val();
          let key = child.getKey();

          if (uid == this.props.uid) {
            favoriter = true;
            // remove
            let uidRef = rowRef.child(key);
            uidRef.remove()
              .then(() => {
                console.log('Remove succeeded.');
              })
              .catch((error) => {
                console.log('Remove failed: ' + error.message);
              })
          }
        })

        if (!favoriter) {
          rowRef.push({
            uid: this.props.uid
          })
        }
      })
  },

  in(element, array) {
    for (let i=0; i<array.length; i++) {
      if (array[i] == element) {
        return true;
      }
    }
    return false;
  },

  renderRow(data) {
    // data.key = the firebase uid of the item
    let {key, item_title, item_author, favoriters} = data;

    let favorited = false;

    if (this.in(this.props.uid, favoriters)) {
      favorited = true;
    }
    return (
      <View
        style={styles.row_with_icon}
      >
        <TouchableOpacity style={styles.row_side}
          onPress={() => this.favorite(key)}
        >
            {
              favorited ?
                <Text style={styles.row_icon}>
                  &#9829;
                  {/*Heart Icon*/}
                </Text>
              :
                <Text style={styles.row_icon}>
                  &#9825;
                  {/*Heart Icon */}
                </Text>
            }
            <Text>
              {favoriters.length}
            </Text>
        </TouchableOpacity>
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
          {/*<Text style={styles.row_icon_right}>
            &#8250;
          </Text>*/}
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
