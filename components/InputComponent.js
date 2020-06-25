import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Dimensions,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const icon = require('../assets/custom-icons/iconeAnonymateActive.png')

class InputComponent extends React.Component {

  render() {
    let { changeTextHandler, onSubmitEditing, value, sendMessage } = this.props;

    return (
      <View style={styles.container, { flexDirection: 'row' }}>
        <TextInput
          style={styles.textInput}
          onChangeText={changeTextHandler}
          onSubmitEditing={sendMessage}
          value={value}
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
    )
  }
}

InputComponent.propTypes = {
  changeTextHandler: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  sendMessage: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  textInput: {
    height: 50,
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
    elevation: 1
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
    elevation: 1
  },
  img:{
    width: 70,
    height: 70,
    marginLeft: -15,
  }
});

export default InputComponent;