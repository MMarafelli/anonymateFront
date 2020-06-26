import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function LanguagesList(props) {

  // const [isEnabledLanguage, setIsEnabledLanguage] = useState(false);
  // const toggleSwitchLanguage = () => setIsEnabledLanguage(previousState => !previousState);

  // console.log(" entrou LanguagesArray")
  // console.log(props.languageList.languageArray)

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.row]}>
        <View >
          <Text style={[styles.textName], props.isPresent ? { color: 'black' } : { color: 'rgba(96,100,109, 1)' }}>
            {props.name}
          </Text>
          <Text style={[styles.textNativeName]}>
            {props.nativeName}
          </Text>
        </View>
        <Switch
          trackColor={{ true: "#e0777c", false: "#767577" }}
          thumbColor={props.isPresent ? "#E50914" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          // onValueChange={toggleSwitchLanguage}
          onValueChange={
            () => props.setInterestsList(
              {
                ...props.interestsState,
                languageArray: props.interestsState.languageArray.map(
                  item => item.name == props.name ?
                    { ...item, isPresent: !props.isPresent }
                    :
                    item
                ),
              }
            )
          }
          value={props.isPresent}
          style={{ borderWidth: 5, borderColor: "blue", }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#f7f7f7',
    // borderWidth: 5,
    // borderColor: "red",
  },
  textName: {
    fontSize: 17,
    lineHeight: 24,
    // borderWidth: 5,
    // borderColor: "blue",
  },
  textNativeName: {
    fontSize: 12,
    lineHeight: 24,
  }
});