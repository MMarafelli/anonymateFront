import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    profileCardRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        height:100,
    },
    profileCard: {
        top: -73,
        margin: 20,
        position: "relative",
        flexDirection: 'row',
        justifyContent: 'center',
        width: 146,
        height: 146,
        borderRadius: 73,
        borderWidth: 0,
        backgroundColor: '#E50914',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 10,
        zIndex: 5
    },
    avatarContainer: {
        position: "relative",
    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 68,
        borderWidth: 0,
        margin: 5,
    },
});