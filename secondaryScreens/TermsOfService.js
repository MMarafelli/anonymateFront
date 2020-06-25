import React, { Component } from 'react';
import { Text, StyleSheet, TouchableHighlight, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

export default class TermsServices extends Component {
    state = {
        buttonEnabled: false
    }

    render() {
        // console.log(this.props)
        return (
            <Modal animationType="slide" visible={this.props.showTerms}>
                <Text style={styles.title}>Terms of Service</Text>

                <ScrollView style={styles.scrollView} onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        // console.log('chegou a fim');
                    }
                }}>

                    <Text style={styles.terms} >
                        1. Your use of the Service is at your sole risk. The service is provided on an "as is" and "as available" basis.
                </Text>
                    <Text style={styles.terms} >
                        2. Support for Expo services is only available in English, via e-mail.
                </Text>
                    <Text style={styles.terms} >
                        3. You understand that Expo uses third-party vendors and hosting partners to provide the necessary hardware, software, networking, storage, and related technology required to run the Service.
                </Text>
                    <Text style={styles.terms} >
                        4. You must not modify, adapt or hack the Service or modify another website so as to falsely imply that it is associated with the Service, Expo, or any other Expo service.
                 </Text>
                    <Text style={styles.terms} >
                        5. You may use the Expo Pages static hosting service solely as permitted and intended to host your organization pages, personal pages, or project pages, and for no other purpose. You may not use Expo Pages in violation of Expo's trademark or other rights or in violation of applicable law. Expo reserves the right at all times to reclaim any Expo subdomain without liability to you.
                </Text>
                    <Text style={styles.terms} >
                        6. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without the express written permission by Expo.
                </Text>
                    <Text style={styles.terms} >
                        7. We may, but have no obligation to, remove Content and Accounts containing Content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party's intellectual property or these Terms of Service.
                </Text>
                    <Text style={styles.terms} >
                        8. Verbal, physical, written or other abuse (including threats of abuse or retribution) of any Expo customer, employee, member, or officer will result in immediate account termination.
                 </Text>
                    <Text style={styles.terms} >
                        9. You understand that the technical processing and transmission of the Service, including your Content, may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.
                </Text>
                    <Text style={styles.terms} >
                        10. You must not upload, post, host, or transmit unsolicited e-mail, SMSs, or "spam" messages.
                </Text>
                </ScrollView>

                <TouchableHighlight style={styles.acceptButton} onPress={this.props.handleCloseTermsPress}>
                    <Text style={styles.acceptButtonText}>Aceito os termos de serviço</Text>
                </TouchableHighlight>

            </Modal>
        )
    }

}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        padding: 20,
    },
    scrollView: {
        padding: 5,
        marginHorizontal: 30,
        marginBottom: 10,
    },
    terms: {
        color: 'gray',
        fontSize: 14,
        fontWeight: 'normal',
        marginBottom: 10
    },
    acceptButton: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
        backgroundColor: '#E50914',
        alignSelf: 'stretch',
        margin: 5,
        marginHorizontal: 20,
    },
    acceptButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
})