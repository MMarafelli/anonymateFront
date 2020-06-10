import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Image } from 'react-native';
import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  var activeIcon = require('../assets/custom-icons/iconeAnonymateActive.png')
  var inactiveIcon = require('../assets/custom-icons/iconeAnonymateInactive.png')
  var icon = props.focused ? activeIcon : inactiveIcon;
  return (
    <View
      style={{
        marginBottom: 13,
        justifyContent: 'center',
        alignItems: 'center',
        width: 110 / 2,
        height: 110 / 2,
        borderRadius: 110 / 4,
        backgroundColor: '#E50914'
      }}
    >
      <Image
        source={icon}
        style={{ width: 80, height: 80}}
      />
    </View>
  );
}
