import { StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  logo: {
    width: wp('15.5%'),
    height: hp('10.5%'),
    padding: 0,
    margin: 0,
    marginTop: 100,
  },
  smokeTextColorWhite: {
    color: 'white',
    fontFamily: "finger-paint",
  },
  smokeTextColorRed: {
    color: '#E50914',
    fontFamily: "finger-paint",
  },
  smokeText: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 25,
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    marginBottom: 15,
    marginHorizontal: 20,
    fontSize: 16,
  },
  errorMessage: {
    textAlign: 'center',
    color: '#ce2029',
    fontSize: 16,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  successMessage: {
    textAlign: 'center',
    color: '#08a092',
    fontSize: 16,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  button: {
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#E50914',
    alignSelf: 'stretch',
    margin: 5,
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  signInLink: {
    padding: 10,
  },
  signInLinkText: {
    color: '#999',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  signUpLink: {
    padding: 10,
  },
  signUpLinkText: {
    color: '#999',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  }
})