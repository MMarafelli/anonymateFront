import React from 'react';
import { Alert } from 'react-native';

export default  function ShowMessage(title, message) {
    Alert.alert(title, message, [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
};

