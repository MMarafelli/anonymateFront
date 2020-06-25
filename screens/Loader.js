import React from "react"
import {
    View,
    ActivityIndicator
} from "react-native";

export default function LoadingScreen() {
    return ( 
        <View style={styles.spinnerStyle}>
            <ActivityIndicator size="large" color="#E50914" />
        </View >
    );
}

const styles = {
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    }
};