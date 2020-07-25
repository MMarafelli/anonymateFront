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

class FlatListComponent extends React.Component {

  // _retrieveData = async () => {
  //   try {
  //     USER = await AsyncStorage.getItem('userId');
  //     if (USER !== null) {
  //       // We have data!!
  //       console.log(USER);
  //     }
  //   } catch (USER) {
  //     // Error retrieving data
  //   }
  // };

  componentDidMount() {
    // console.log('componentDidMount')
    // this._retrieveData()
  }

  render() {
    // console.log('FlatListComponent')
    // console.log(this.props.userId)
    // console.log(this.props.user.senderId)
    // console.log(this.props.conversationLength)
    // console.log(this.props.itemId)

    return (

      <View style={[{
        display: 'flex',
        alignItems: this.props.userId === this.props.user.senderId ? "flex-end" : "flex-start",
        marginTop: (this.props.itemId + 1) == 1 ? 5 : 0,
        marginBottom: (this.props.itemId + 1) == this.props.conversationLength ? 5 : 0,
      }]}>
        <View style={[
          styles.listItemContainer,
          { backgroundColor: this.props.userId === this.props.user.senderId ? '#ffe3e3' : "#fff" }
        ]}
        >
           {/* <Image style={styles.imageStyles}source={{ uri: this.props.user.avatar }}/> */}
          <Text style={styles.listItem}>
            {this.props.text}
          </Text>
        </View>
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
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
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