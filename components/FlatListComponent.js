import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

let USER = '';

class FlatListComponent extends React.Component {

  componentDidMount() {
    USER = AsyncStorage.getItem('userId');
  }

  render() {
    // let { item } = this.props;
    console.log('FlatListComponent')
    // console.log(this.props.userId)
    // console.log(this.props.user.senderId)
    return (
      
      <View style={[{
        display: 'flex',
        alignItems: this.props.userId === this.props.user.senderId ? "flex-end" : "flex-start",
      }]}>
        <View style={[
          styles.listItemContainer,
          { backgroundColor: this.props.userId === this.props.user.senderId ? '#ffe3e3' : "#fff" }
        ]}
        >
          <Image
            style={styles.imageStyles}
            source={{ uri: this.props.user.avatar }}
          />
          <Text style={styles.listItem}>
            {this.props.text}
          </Text>
        </View>
        <View style={styles.marginBottom} />
      </View >
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    width: "auto",
    maxWidth: '80%',
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 14,
  },
  marginBottom: {
    height: 5,
    backgroundColor: "transparent"
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    marginStart: 10,
    marginEnd: 10,
    elevation: 1
  },
  imageStyles: {
    width: 35,
    height: 35,
    borderRadius: 35,
    marginLeft: 10,
    marginRight: 10
  }
});

export default FlatListComponent;