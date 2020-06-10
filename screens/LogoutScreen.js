import React from 'react';
import { View } from 'react-native';

import LoadingScreen from '../screens/Loader'

import { StackActions, NavigationActions } from 'react-navigation';

import socket from "../components/socketConfig";

export default function LogoutScreen(props) {

    let isSubscribed = true;

    function logout() {
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')

        if (isSubscribed) {
            props.screenProps.map((item) => {
                socket.emit('forceDisconnect', (item.user.userId))
            })
            isSubscribed = false
        }


        //const logoutAction = StackActions.reset({
        //    index: 0,
        //    key: null,
        //    actions: [
        //        NavigationActions.navigate({ routeName: 'SignIn', })
        //    ],
        //});

        //global.stackNavigator.dispatch(
        //    logoutAction
        //);
    };

    return (
        <View style={styles.container}>
            <LoadingScreen>
                {logout()}
            </LoadingScreen>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'black',
    },
};

LogoutScreen.navigationOptions = {
    title: 'Logout',
    headerStyle: {
        backgroundColor: 'black',
    },
    headerTintColor: '#fff',
};