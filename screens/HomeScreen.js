import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import generalStyle from '../style/generalStyle'
import homeScreenStyle from '../style/homeScreenStyle'
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen(props) {
  //  console.log('Aqui homescreen')

  let location, user, geocode

  props.screenProps.map((item) => {
    location = item.location
    user = item.user
    geocode = item.geocode
  })
  // console.log(user.name)
  // console.log(location)
  let city;
  let region;
  let country;
  if (geocode !== null) {
    geocode.map((item) => {
      city = item.city
      region = item.region
      country = item.country
    })
  }
  // console.log(city)
  // console.log(region)
  // console.log('---------------')
  return (
    <View style={generalStyle.container}>
      <View style={generalStyle.welcomeContainer}>
        <ScrollView
          contentContainerStyle={generalStyle.contentContainer}>
          <View style={generalStyle.transparetRow}></View>
          <View style={generalStyle.shadow}>
            <View style={homeScreenStyle.profileCardRow}>
              <View style={homeScreenStyle.profileCard}>
                <View style={homeScreenStyle.avatarContainer}>
                  <Image style={homeScreenStyle.avatar}
                    source={
                      __DEV__
                        ? require('../assets/images/robot-dev.png')
                        : require('../assets/images/robot-prod.png')
                    }
                  />
                </View>
              </View>
            </View>

            <View style={generalStyle.getStartedContainer} >

              <Text style={generalStyle.name}>{user.name}</Text>

              <View
                style={[generalStyle.homeScreenFilename]}>
                <Text>
                  <Ionicons
                    name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
                    size={26}
                    style={{ marginBottom: -3 }}
                    color='#4db6ac'
                  /> Location: {city + ", " + region + ", " + country}
                </Text>
              </View>

              <Text style={generalStyle.name}>
                Change this text and your app will automatically reload.
          </Text>
            </View>

            <View style={generalStyle.helpContainer}>
              <TouchableOpacity onPress={handleHelpPress} style={generalStyle.helpLink}>
                <Text style={generalStyle.helpLinkText}>
                  Help, it didn’t automatically reload!
            </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  title: 'Home',
  headerStyle: {
    backgroundColor: 'black',
    height: 40,
  },
  headerTintColor: '#fff',
};


function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}
