import { StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'black',
  },
  logo: {
    width: wp('40.0%'),
    height: hp('20.0%'),
    padding: 0,
    marginHorizontal:  wp('05.0%'),
    marginTop: hp('15.0%'),
    // borderWidth: 5,
    // borderColor: "red",
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
    marginTop: 0,
    // borderWidth: 5,
    // borderColor: "blue",
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
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
    marginBottom: 5,
    marginHorizontal: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
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