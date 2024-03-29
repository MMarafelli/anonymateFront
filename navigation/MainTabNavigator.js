import React from 'react';
import { Platform, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import TabBarIcon from '../components/TabBarIcon';
import TabBarIconAdd from '../components/TabBarIconAdd';
import HomeScreen from '../screens/HomeScreen';
import InterestsScreen from '../screens/InterestsScreen';
import PostsScreen from '../screens/PostsScreen';
import StartChatingScreen from '../screens/StartChatingScreen';
import LogoutScreen from '../screens/LogoutScreen';

import Colors from '../constants/Colors';

const config = Platform.select({
  web: {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-person${focused ? '' : '-outline'}`
          : 'md-person'
      }
    />
  ),
};

HomeStack.path = '';

const InterestsStack = createStackNavigator(
  {
    Interests: InterestsScreen,
  },
  config
);

InterestsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

InterestsStack.path = '';

const PostsStack = createStackNavigator(
  {
    Posts: PostsScreen,
  },
  config
);

PostsStack.navigationOptions = {
  tabBarOnPress({ navigation, defaultHandler, }) {

    if (navigation.isFocused()) {
      // console.log('aqui no isFocused')
    }
    // tab was not previously focused
    defaultHandler();
  },
  tabBarLabel: 'Posts',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-chatboxes'} />
  ),
};

PostsStack.path = '';

const StartChating = createStackNavigator(
  {
    StartChating: StartChatingScreen,
  },
  config
);

StartChating.navigationOptions = {
  tabBarOnPress({ navigation, defaultHandler, }) {

    if (navigation.isFocused()) {
      // console.log('aqui no isFocused')
    }
    // console.log('botao principal')
    // tab was not previously focused
    defaultHandler();
  },
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <TabBarIconAdd
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
      color={Colors.tabIconSelected}
    />
  ),
};

StartChating.path = '';

const LogoutStack = createStackNavigator(
  {
    LogoutStack: LogoutScreen,
  },
  config
);

LogoutStack.navigationOptions = ({ screenProps }) => ({
  tabBarOnPress({ navigation, defaultHandler }) {

    defaultHandler();
  },
  tabBarLabel: 'Logout',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
    />
  ),
});

LogoutStack.path = '';

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    InterestsStack,
    StartChating,
    PostsStack,
    LogoutStack,
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.tabIconSelected,
      inactiveTintColor: Colors.tabIconDefault,
      showLabel: false,
      safeAreaInset: { bottom: 'never', top: 'never' },
      style: {
        backgroundColor: 'black',
        borderTopColor: '#E50914',
        borderTopWidth: 3,
        elevation: 8,
      },
    },
  });

tabNavigator.path = '';

export default tabNavigator;
