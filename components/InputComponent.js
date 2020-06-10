import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight, 
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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
          placeholder="Type a message"
          returnKeyType="done"
          returnKeyLabel="done"
          underlineColorAndroid="transparent"
        />
        <TouchableHighlight
          style={styles.inputButton}
          underlayColor='#fff'
          onPress={sendMessage}
        >
          <Text>Send</Text>
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
    borderColor: "transparent",
    width: screenWidth - 70,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 1
  },
  inputButton: {
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    elevation: 1
  }
});

export default InputComponent;