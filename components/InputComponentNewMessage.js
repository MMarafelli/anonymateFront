import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Text,
  TouchableHighlight,
  Dimensions,
  Image,
} from 'react-native';
import { func } from 'prop-types';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const icon = require('../assets/custom-icons/iconeAnonymateActive.png')

class InputComponent extends React.Component {

  state = {
    text: ''
  }

  render() {
    let { onChangeText, onSubmitEditing, valueText, sendMessage, sendMessageStatus } = this.props;
    // console.log(this.props)

    return (
      < View style={styles.container} >
        <View style={styles.inputArea}>
          <TextInput
            style={[styles.textInput, { borderColor: sendMessageStatus ? 'green' : 'red', borderWidth: 1 }]}
            onChangeText={onChangeText}
            onSubmitEditing={sendMessage}
            value={valueText}
            multiline
            textAlignVertical={'top'}
            placeholder="Digite uma mensagem"
            returnKeyType="done"
            returnKeyLabel="done"
            underlineColorAndroid="transparent"
          />
          <TouchableHighlight
            style={styles.inputButton}
            underlayColor='#ffe3e3'
            onPress={sendMessage}
          >
            <Image
              source={icon}
              style={styles.img}
            />
          </TouchableHighlight>
        </View>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputArea: {
    flexDirection: 'row',
    width: "100%",
    marginBottom: 5,
  },
  textInput: {
    alignItems: 'flex-start',
    height: 150,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 10,
    marginBottom: 10,
    borderColor: "transparent",
    width: screenWidth - 80,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputButton: {
    display: 'flex',
    height: 50,
    width: 50,
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#9e9e9e',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    width: 70,
    height: 70,
    marginLeft: -15,
  }
});

export default InputComponent;