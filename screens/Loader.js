import React from "react"
import {
    View,
    ActivityIndicator
} from "react-native";

export default function LoadingScreen() {
    return (
        <View style={styles.spinnerStyle}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View >
    );
}

const styles = {
    spinnerStyle: {
        flex: 1,
        marginTop:240,
        justifyContent: 'center',
        alignItems:'center'
    }
};