import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function InterestsList(props) {

  // const [isEnabledLanguage, setIsEnabledLanguage] = useState(false);
  // const toggleSwitchLanguage = () => setIsEnabledLanguage(previousState => !previousState);

  // console.log(" entrou InterestsArray")
  // console.log(props.languageList.languageArray)

  return (
    <View style={[styles.row]}>
      <Text style={[styles.textName], props.isPresent ? { color: 'black' } : { color: 'rgba(96,100,109, 1)' }}>
        {props.nativeName}
      </Text>
      <Switch
        trackColor={{ true: "#e0777c", false: "#767577" }}
        thumbColor={props.isPresent ? "#E50914" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        // onValueChange={toggleSwitchLanguage}
        onValueChange={
          () => props.setInterestsList(
            {
              ...props.interestsState,
              interestsArray: props.interestsState.interestsArray.map(
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
    textAlign: 'center',
    // borderWidth: 5,
    // borderColor: "blue",
  }
});