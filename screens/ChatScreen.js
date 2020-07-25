import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  Platform,
  Image,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import socket from "../services/SocketConfig";

import LoadingScreen from '../screens/Loader'
import FlatListComponentChat from '../components/FlatListComponentChat';
import InputComponentChat from '../components/InputComponentChat';

import BackButtonHandler from '../components/BackButtonHandler';

const isAndroid = Platform.OS == "android";
const viewPadding = 10;
let USER = '';

if (!window.location) {
  // App is running in simulator
  window.navigator.userAgent = 'ReactNative';
}

export default class ChatScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: null,
      tasks: [],
      text: "",
      conversationId: this.props.navigation.state.params.conversationId,
      userId: this.props.navigation.state.params.userId,
      friend: this.props.navigation.state.params.friend,
    };

    socket.on('message', this.onReceivedMessages)
    socket.on('receiveMessage', this.onReceivedMessage)
    // USER = AsyncStorage.getItem('userId');
  }

  componentWillMount() {
    // console.log('componentWillMount')
    //if (Platform.OS === 'android') {
    //}
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount')
    this._isMounted = false;
    // if (Platform.OS === 'android') {
    // }
    BackButtonHandler.unmount();
  }

  componentDidMount() {
    // console.log('componentDidMount')
    console.log(this.props.navigation.state.params)
    this._isMounted = true;

    BackButtonHandler.mount(true, this.props.navigation);
    socket.emit('openChat', this.state.friend.contactId, this.state.conversationId)

  }


  /**
   * Save the input values change to state
   */
  changeTextHandler = text => {
    this.setState({ text: text });
    const receiver = this.state.friend.contactId;
    socket.emit('userTyping', receiver);
  };

  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  sendMessage = () => {
    let notEmpty = this.state.text.trim().length > 0;

    if (notEmpty) {
      this.setState(
        prevState => {
          let { tasks } = prevState;
          let messageArr = [];
          // console.log('storeMessages')
          // console.log(item2)
          let messageModel = {
            userId: this.state.userId,
            text: this.state.text,
            createdAt: new Date(),
            user: {
              senderId: this.state.userId,
              name: this.state.userId,
              avatar: 'https://placeimg.com/140/140/any',
            },
          };
          // console.log('messageModel')
          // console.log(messageModel)
          messageArr.push(messageModel);

          // messageArr.reverse();
          return {
            tasks: tasks.concat(messageArr),
            text: "",
          };
        }
      );

      const response = socket.emit('sendMessage', this.state.friend.contactId, this.state.text, this.state.conversationId);
      // console.log('response do envia mensagem')
      // console.log(response)

    }
  };

  /**
   * When the server sends messages to this.
   */
  onReceivedMessages = (messages) => {
    this.storeMessages(messages);
  };

  /**
   * When the server sends a message to this.
   */
  onReceivedMessage = (message) => {
    this.storeMessages({ chating: message });
  };

  // Helper functions
  storeMessages = (data) => {
    // console.log('storeMessages')
    // console.log(data)
    if (this._isMounted) {
      this.setState(
        prevState => {
          let { tasks } = prevState;
          let messageArr = [];
          // console.log('storeMessages')
          data.chating.map((item) => {
            item.messages.map((item2) => {
              // console.log(item2)
              let messageModel = {
                _id: item2._id,
                userId: this.state.userId,
                text: item2.message,
                createdAt: item2.messageAddAt,
                user: {
                  senderId: item2.sender ? item2.sender : "PC",
                  name: item2.sender ? item2.sender : "PC",
                  avatar: 'https://placeimg.com/140/140/any',
                },
              };
              // console.log('messageModel')
              // console.log(messageModel)
              messageArr.push(messageModel);
            })
          });

          // messageArr.reverse();
          return {
            tasks: tasks.concat(messageArr),
          };
        }
      );
    }
  }

  render() {
    console.log('aqui this.state.userId ' + this.state.userId)
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={[styles.container]}>
            <View style={styles.headerContainer}>
              <Text
                style={styles.headerArrow}
                onPress={() => (BackButtonHandler.onBackButtonPressAndroid(true, this.props.navigation))}
              >
                <Ionicons name={'md-arrow-back'} size={20} />
              </Text>
              <Image
                style={styles.pic}
                source={require('../assets/images/default.jpeg')}
              />
              <Text style={styles.headerFriendName}>{this.state.friend.displayname}</Text>
            </View>
            <FlatList
              style={styles.list}
              data={this.state.tasks}
              ref={ref => this.flatList = ref}
              onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
              onLayout={() => this.flatList.scrollToEnd({ animated: true })}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) =>
                <FlatListComponentChat
                  {...item} itemId={index} userId={this.state.userId} conversationLength={this.state.tasks.length}
                />
              }
              keyExtractor={(item, index) => index.toString()}
            />
            <InputComponentChat
              changeTextHandler={this.changeTextHandler}
              onSubmitEditing={() => this.submithandler()}
              value={this.state.text}
              sendMessage={this.sendMessage}
            />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "#e0e0e0",
    padding: 0,
    paddingTop: 0,
    width: '100%',
    justifyContent: "flex-end",
  },
  buttonStyle: {
    color: "red",
    backgroundColor: "green",
  },
  list: {
    width: "100%"
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#000000',
    padding: 15
  },
  headerArrow: {
    fontWeight: '400',
    marginLeft: 5,
    marginRight: 15,
    color: '#ffff'
  },
  headerFriendName: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 10,
    textAlign: 'center',
    color: '#ffff'
  },
  pic: {
    borderRadius: 30,
    width: 30,
    height: 30,
  }
});