import React from 'react';
import { Text, View } from 'react-native';

export default function Warning(props) {
    // console.log(props)
    return (
        <View style={{
            marginBottom: 13,
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            backgroundColor: "red",
        }}>
            <Text style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: 'white'
            }}>{props.erro}</Text>
        </View>
    );
}
