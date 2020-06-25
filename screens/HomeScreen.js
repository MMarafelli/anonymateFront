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

  let location, user, geocode, locationText

  props.screenProps.map((item) => {
    location = item.location
    user = item.user
    geocode = item.geocode
  })

  // console.log(user.name)
  // console.log(location)
  let neighborhood, city, region, country;
  if (geocode !== null) {
    neighborhood = geocode.neighborhood
    city = geocode.city
    region = geocode.region
    country = geocode.country
  }
  if (geocode == null || neighborhood == undefined || city == undefined || region == undefined || country == undefined) {
    locationText = "Carregando localização"
  } else {
    locationText = neighborhood + ", " + city + ", " + region + ", " + country
  }

  // console.log('---------------')
  // console.log(neighborhood)
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
                  /> {locationText}
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
    height: 30,
  },
  headerTitleStyle: {
    marginBottom: 25,
  },
  headerTintColor: '#fff',
};


function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

