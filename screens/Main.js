import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppNavigator from '../navigation/AppNavigator';

import { StackActions, NavigationActions } from 'react-navigation';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import socket from "../components/socketConfig";

export default class Main extends Component {
  static navigationOptions = {
    header: null,
  };

  _isMounted = false;

  state = {
    isLoadingComplete: false,
    location: null,
    errorMessage: null,
    geocode: null,
    user: this.props.navigation.state.params.user,
    socket: '',
    currentUserChat: '',
  };


  render() {
    console.log('render')
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    return (
      <View style={stylesHere.container}>
        {Platform.OS === 'ios' && <StatusBar hidden barStyle="default" />}
        <AppNavigator style={stylesHere.appNavigator}
          screenProps={[{
            user: this.state.user,
            geocode: this.state.geocode,
            location: this.state.location,
            text: text,
            socket: this.state.socket,
          }]} />
      </View>
    )

  }

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    console.log('_handleFinishLoading')
  };

  _getLocationAsync = async () => {
    //   console.log('async')
    let providerStatus = await Location.getProviderStatusAsync();
    if (!providerStatus.locationServicesEnabled) {
      this.setState({
        errorMessage: 'Location Services Disabled'
      })
      return;
    }

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
      return
    }

    let location = await Location.getCurrentPositionAsync({});
    let geocode = await Location.reverseGeocodeAsync(location.coords);
    this.setState({ location });
    this.setState({ geocode });
  };

  componentDidUpdate(prevProps, props) {
    console.log('componentDidUpdate')
    if (this.props.socket !== prevProps.socket) {
    }
  }

  componentWillMount() {
    console.log('mount')
    this._getLocationAsync();
    this._connectSocketIo();
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    console.log('componentDidMount')
    console.log(this._isMounted)

  }

  _connectSocketIo = async () => {
    socket.connect()
    // socket.emit('online', (this.props.navigation.state.params.user.userId))
    // socket.on('connect', () => {
    //   console.log('connected to socket server');
    //   if (this._isMounted) {
    //     this.setState({ socket });
    //     // currentUserChat = socket.id
    //     // this.setState({ currentUserChat })
    //     // console.log('currentUserChat ' + this.state.currentUserChat)
    //     this._isMounted = false;
    //   }
    // });
    socket.on('disconnect', (reason) => {
      console.log("Socket Closed. ");
      console.log(reason)
      if (reason != '') {
        // // console.log('desconectou')
        // socket.disconnect()
        // NavigationActions.reset({
        //   index: 0,
        //   key: null,
        // });
        // console.log(this.props)
        this._goToSigin()
      }
    })
    console.log(socket.connected)
    console.log(socket.disconnected)
  }

  _goToSigin = async () => {
    console.log('_goToSigin')
    const logoutAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'SignIn', })
      ],
    });

    global.stackNavigator.dispatch(
      logoutAction
    );
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  }
}

const stylesHere = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  appNavigator: {
    backgroundColor: 'black',
  }
});