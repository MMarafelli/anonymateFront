import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, Image, StatusBar, TextInput, View, Text } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import loginApi from '../services/loginApi';

import { AsyncStorage } from 'react-native';

import loginStyles from '../style/loginStyles';

export default class SignIn extends Component {
    static navigationOptions = {
        header: null,
    };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            dispatch: PropTypes.func,
        }).isRequired,
    };

    state = {
        email: 'mmarafelli@outlook.com',
        //email: 'liliz@outlook.com',
        password: '123456',
        error: '',
    };

    handleEmailChange = (email) => {
        this.setState({ email });
    };

    handlePasswordChange = (password) => {
        this.setState({ password });
    };

    handleCreateAccountPress = () => {
        this.props.navigation.navigate('SignUp');
    };

    handleSignInPress = async () => {
        if (this.state.email.length === 0 || this.state.password.length === 0) {
            this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
        } else {
            try {
                var date = new Date();
                const response = await loginApi.post('/authenticate', {
                    email: this.state.email,
                    password: this.state.password,
                    lastLogin: date,
                });

                console.log('aqui')
                console.log(response.data)


                async function storeData() {
                    //        console.log('grava')
                    try {
                        await AsyncStorage.setItem('userId', response.data.userId);
                        await AsyncStorage.setItem('token', response.data.token);
                        //            console.log('gravou')
                    } catch (error) {
                        console.log('erro grava')
                        console.log(error)
                    }
                };

                storeData();

                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'Main',
                            params: { user: response.data }
                        }),
                    ],
                });
                try {
                    // await _writeTolken();
                    this.props.navigation.dispatch(resetAction);
                } catch (erro) {
                    console.log('n gravou')
                    console.log(erro)
                }

            } catch (_err) {
                console.log(_err)
                if (_err.response.status == 400) {
                    this.setState({ error: _err.response.data.error });
                } else {
                    this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
                }
            }
        }
    };

    render() {
        return (
            <View style={loginStyles.container}>
                <StatusBar hidden />
                <Image style={loginStyles.logo} source={require('../assets/images/airbnb_logo.png')} resizeMode="contain" />
                <Text style={loginStyles.smokeText}>
                    <Text style={loginStyles.smokeTextColorWhite}>A</Text>
                    <Text style={loginStyles.smokeTextColorWhite}>n</Text>
                    <Text style={loginStyles.smokeTextColorWhite}>o</Text>
                    <Text style={loginStyles.smokeTextColorWhite}>n</Text>
                    <Text style={loginStyles.smokeTextColorWhite}>y</Text>
                    <Text style={loginStyles.smokeTextColorRed}>m</Text>
                    <Text style={loginStyles.smokeTextColorRed}>a</Text>
                    <Text style={loginStyles.smokeTextColorRed}>t</Text>
                    <Text style={loginStyles.smokeTextColorRed}>e</Text>
                </Text>
                <TextInput style={loginStyles.input}
                    placeholder="Endereço de e-mail"
                    value={this.state.email}
                    onChangeText={this.handleEmailChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput style={loginStyles.input}
                    placeholder="Senha"
                    value={this.state.password}
                    onChangeText={this.handlePasswordChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                />
                {this.state.error.length !== 0 && <Text style={loginStyles.errorMessage}>{this.state.error}</Text>}
                <TouchableHighlight style={loginStyles.button} onPress={this.handleSignInPress}>
                    <Text style={loginStyles.buttonText}>Entrar</Text>
                </TouchableHighlight>
                <TouchableHighlight style={loginStyles.signUpLink} onPress={this.handleCreateAccountPress}>
                    <Text style={loginStyles.signUpLinkText}>Criar conta grátis</Text>
                </TouchableHighlight>
            </View>
        );
    }
}