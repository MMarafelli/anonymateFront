import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, Image, StatusBar, TextInput, View, Text } from 'react-native';
import loginApi from '../services/loginApi';
import { StackActions, NavigationActions } from 'react-navigation';

import loginStyles from '../style/loginStyles';

export default class SignUp extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
      goBack: PropTypes.func,
    }).isRequired,
  };

  state = {
    name: 'Matheus Marafelli',
    username: 'MMarafelli',
    email: 'mmarafelli@outlook.com',
    password: '123456',
    error: '',
    success: '',
  };

  handleNameChange = (name) => {
    this.setState({ name });
  };

  handleUsernameChange = (username) => {
    this.setState({ username });
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleBackToLoginPress = () => {
    this.props.navigation.goBack();
  };

  handleSignUpPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha todos os campos para continuar!' }, () => false);
    } else {
      try {
        const response = await loginApi.post('/register', {
          name: this.state.name,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        });

        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'Main',
              params: { user: response.data }
            }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
      } catch (_err) {
        console.log(_err.response.status)
        console.log(_err.response.data.error)
        if (_err.response.status == 400) {
          this.setState({ error: _err.response.data.error });
        } else {
          this.setState({ error: 'Houve um problema com o cadastro, verifique os dados preenchidos!' });
        }
      }
    }
  };

  goToLogin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'SignIn' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

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
        {this.state.success.length !== 0 && <Text style={loginStyles.successMessage}>{this.state.success}</Text>}
        <TextInput style={loginStyles.input}
          placeholder="Nome completo"
          value={this.state.name}
          onChangeText={this.handleNameChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput style={loginStyles.input}
          placeholder="Nome de usuário"
          value={this.state.username}
          onChangeText={this.handleUsernameChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
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
        <TouchableHighlight style={loginStyles.button} onPress={this.handleSignUpPress}>
          <Text style={loginStyles.buttonText}>Criar conta</Text>
        </TouchableHighlight>
        <TouchableHighlight style={loginStyles.signInLink} onPress={this.handleBackToLoginPress}>
          <Text style={loginStyles.signInLinkText}>Voltar ao login</Text>
        </TouchableHighlight>
      </View >

    );
  }
}