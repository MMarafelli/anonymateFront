import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, SafeAreaView } from 'react-native';
import AppNavigator from '../navigation/AppNavigator';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import socket from "../services/SocketConfig";
import LanguagesArray from '../constants/LanguagesArray';
import InterestsArray from '../constants/InterestsArray';

const API_KEY = 'AIzaSyBcbNV4QZfiOV2LPTkL0v4an-rLdFe48eM';

export default class Main extends Component {
  static navigationOptions = {
    header: null,
    footer: null,
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
    languagesArray: '',
    interestsArray: '',
  };


  render() {
    // console.log('render')
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    return (
      <View style={stylesHere.container}>
        {Platform.OS === 'ios' && <StatusBar hidden barStyle="default" />}
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}
          forceInset={{ top: 'always', bottom: 'always' }}>
          <AppNavigator style={stylesHere.appNavigator}
            screenProps={[{
              user: this.state.user,
              geocode: this.state.geocode,
              location: this.state.location,
              text: text,
              socket: this.state.socket,
              languagesArray: this.state.languagesArray,
              interestsArray: this.state.interestsArray,
            }]} />
        </SafeAreaView>
      </View >
    )

  }

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    // console.log('_handleFinishLoading')
  };

  _getLocationAsync = async () => {
    // console.log('async')
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
    // let geocode = await Location.reverseGeocodeAsync(location.coords);
    let geocode;

    try {
      const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + location.coords.latitude + ',' + location.coords.longitude + '&key=' + API_KEY)
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log('ADDRESS GEOCODE is BACK!! => ' + responseJson.results[0]);
          // console.log(responseJson.results[0].address_components)
          // console.log(responseJson.results[0].address_components[2].long_name)
          // console.log(responseJson.results[0].address_components[3].long_name)
          // console.log(responseJson.results[0].address_components[4].long_name)
          // console.log(responseJson.results[0].address_components[5].short_name)
          geocode = {
            neighborhood: responseJson.results[0].address_components[2].long_name,
            city: responseJson.results[0].address_components[3].long_name,
            region: responseJson.results[0].address_components[4].long_name,
            country: responseJson.results[0].address_components[5].short_name,
          }
          return true
        })
      // console.log(response)
    } catch (error) {
      console.log("adress get error")
      console.log(error)
    }

    this.setState({ ...this.state, location, geocode });
    // console.log(location)
    // console.log(geocode)
    // console.log(location.coords.latitude)
    // console.log(location.coords.longitude)
  };

  componentDidUpdate(prevProps, props) {
    // console.log('componentDidUpdate')
    if (this.props.socket !== prevProps.socket) {
    }
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount')
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    // console.log('componentDidMount')
    this.state.languagesArray = LanguagesArray
    this.state.interestsArray = InterestsArray
    // console.log(this._isMounted)
    this._getLocationAsync();
    this._connectSocketIo();

  }

  _connectSocketIo = async () => {
    socket.connect()
    // socket.emit('online', (this.props.navigation.state.params.user.userId))
    // socket.on('connect', () => {
    // console.log('connected to socket server');
    //   if (this._isMounted) {
    //     this.setState({ socket });
    //     // currentUserChat = socket.id
    //     // this.setState({ currentUserChat })
    //     // console.log('currentUserChat ' + this.state.currentUserChat)
    //     this._isMounted = false;
    //   }
    // });
    socket.on('disconnect', (reason) => {
      /// console.log("Socket Closed. ");
      /// console.log(reason)
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
    // console.log(socket.connected)
    // console.log(socket.disconnected)
  }

  _goToSigin = async () => {
    // console.log('_goToSigin')
    //    const logoutAction = StackActions.reset({
    //      index: 0,
    //      key: null,
    //      actions: [
    //        NavigationActions.navigate({ routeName: 'SignIn', })
    //      ],
    //    });
    //
    //    global.stackNavigator.dispatch(
    //      logoutAction
    //    );
    // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  }
}

const stylesHere = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  appNavigator: {
    flex: 1,
    backgroundColor: 'black',
  }
});