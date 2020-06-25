import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TextInput, Switch, StyleSheet, FlatList, KeyboardAvoidingView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import loginApi from '../services/loginApi';
import { YellowBox } from 'react-native'


import LanguagesList from "../components/LanguagesList"
import InterestsList from "../components/InterestsList"

export default function SettingsScreen(props) {
  YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.', // TODO: Remove when fixed
  ])

  console.ignoredYellowBox = [
    'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.', // TODO: Remove when fixed
  ];

  const [valueLanguage, setTextLanguage] = useState('');

  const [interestsState, setInterestsList] = useState({
    interestsArray: [],
    interestsList: [],
    languageArray: [],
    languageArrayAux: [],
    languageSponkenList: [],
    loadingInterests: true
  })

  const [erro, setErro] = useState()


  async function storeInterestsLanguages() {
    // console.log('storeInterestsLanguages()')
    let userId;
    props.screenProps.map((item) => {
      userId = item.user.userId
    })
    try {
      const response = await loginApi.post('/interestsUpdate', {
        userId: userId,
        interests: interestsState.interestsList,
        languageSponkenList: interestsState.languageSponkenList,
      });

      // console.log('aqui')
      // console.log(response.data)
      setErro('')

    } catch (_err) {
      // console.log(_err)
      if (_err.response.status == 400) {
        // console.log(_err.response.data.error);
        setErro('Houve um problema com a atualização de interesses! ' + _err.response.data.error)
      } else {
        // console.log('Houve um problema com a atualização de interesses!');
        setErro('Houve um problema com a atualização de interesses! ' + _err.response.data.error)
      }
    }
  }

  async function getStoredInterests() {
    // console.log("getStoredInterests 1")
    let userId;
    props.screenProps.map((item) => {
      userId = item.user.userId
    })
    try {
      const response = await loginApi.post('/interests', {
        userId: userId
      });

      // console.log(response.data)

      if (response.status == 200) {
        setInterestsList({
          ...interestsState,
          interestsList: response.data.interests,
          languageSponkenList: response.data.languageSponkenList,
          loadingInterests: false,
        })
        // setLoadingInterests(false)
      }

    } catch (_err) {
      // console.log(_err)
      if (_err.response.status == 400) {
        console.log(_err.response.data.error);
        setErro('Houve um problema com a atualização de interesses! ' + _err)
      } else {
        console.log('Houve um problema com a atualização de interesses!');
        setErro('Houve um problema com a atualização de interesses! ' + _err)
      }
    }
  }

  // console.log('loadingInterests ' + interestsState.loadingInterests)
  if (interestsState.loadingInterests) {
    getStoredInterests()
  }

  function languageListManager(language, remove) {
    // console.log(language)
    if (interestsState.languageArray.length > 0) {
      // console.log("tipo do languageSponkenList")
      // console.log(typeof (interestsState.languageSponkenList))
      if (remove) {
        let arrayAuxSpokenLanguage = interestsState.languageSponkenList
        const index = arrayAuxSpokenLanguage.indexOf(language);
        if (index > -1) {
          arrayAuxSpokenLanguage.splice(index, 1);
        }
        setInterestsList({
          ...interestsState,
          languageSponkenList: arrayAuxSpokenLanguage,
        })
      } else {
        let arrayAuxSpokenLanguage = interestsState.languageSponkenList
        arrayAuxSpokenLanguage.push(language)
        // console.log("teste")
        // console.log(arrayAuxSpokenLanguage)
        setInterestsList({
          ...interestsState,
          languageSponkenList: arrayAuxSpokenLanguage,
        })
      }
    }
    // console.log("linguas faladas: ")
    // console.log(interestsState.languageSponkenList)
    if (interestsState.languageArray.length > 0 && !interestsState.loadingInterests) {
      storeInterestsLanguages()
    }
  }

  async function InterestsArrayFunction() {

    // console.log('//////////////////////////////////////')
    // console.log(interestsState.interestsList)
    // console.log(interestsState.languageArray.length)
    // console.log(interestsState.languageSponkenList)
    // console.log(interestsState.languageArrayAux)
    // console.log('**************************************')

    if (interestsState.languageArray.length == 0) {
      await props.screenProps.map((item) => {
        let arrayLanguages = Object.values(item.languagesArray)
        arrayLanguages = arrayLanguages.map(obj => ({ ...obj, isPresent: false }))
        if (arrayLanguages.length > 0) {
          let arrayLanguagesFiltered = (function (pattern) {
            let arrayLanguagesFiltered = [], i = arrayLanguages.length, re = new RegExp('^' + pattern);
            while (i--) {
              let stringAuxName = arrayLanguages[i].name
              let stringAuxNativeName = arrayLanguages[i].nativeName
              stringAuxName = stringAuxName.toLowerCase()
              stringAuxNativeName = stringAuxName.toLowerCase()
              if (re.test(stringAuxName) || re.test(stringAuxNativeName)) {
                arrayLanguagesFiltered.push(arrayLanguages[i]);
              }
            }
            return arrayLanguagesFiltered;
          })(valueLanguage.toLowerCase());
          arrayLanguagesFiltered = arrayLanguagesFiltered.reverse()
          // console.log(arrayLanguagesFiltered)
          arrayLanguagesFiltered.map(obj => interestsState.languageSponkenList.includes(obj.name) ? obj.isPresent = true : obj.isPresent = false)
          setInterestsList({
            ...interestsState,
            languageArray: arrayLanguagesFiltered,
          })
        }
      })
    } else {
      interestsState.languageArray.map(
        (item) => {
          if (item.isPresent == true && !interestsState.languageSponkenList.includes(item.name)) {
            // console.log("language name")
            // console.log(item.name)
            let remove = false
            languageListManager(item.name, remove)
          } else if (!item.isPresent == true && interestsState.languageSponkenList.includes(item.name)) {
            let remove = true
            languageListManager(item.name, remove)
          }
        }
      )
    }

    if (interestsState.interestsArray.length == 0) {
      await props.screenProps.map((item) => {
        let arrayInterests = Object.values(item.interestsArray)
        if (arrayInterests.length > 0) {
          // console.log(arrayInterests)
          arrayInterests.map(obj => interestsState.interestsList.includes(obj.name) ? obj.isPresent = true : obj.isPresent = false)
          setInterestsList({
            ...interestsState,
            interestsArray: arrayInterests,
          })
        }
      })
    } else {
      interestsState.interestsArray.map(
        (item) => {
          if (item.isPresent == true && !interestsState.interestsList.includes(item.name)) {
            // console.log("interest name")
            // console.log(item.name)
            let remove = false
            interestListManager(item.name, remove)
          } else if (!item.isPresent == true && interestsState.interestsList.includes(item.name)) {
            let remove = true
            interestListManager(item.name, remove)
          }
        }
      )
    }

  }
  if (!interestsState.loadingInterests) {
    InterestsArrayFunction()
  }

  function interestListManager(interest, remove) {
    // console.log(interest)
    // console.log("tipo do interestsList")
    // console.log(typeof (interestsState.interestsList))
    if (remove) {
      let arrayAuxinterestsList = interestsState.interestsList
      const index = arrayAuxinterestsList.indexOf(interest);
      if (index > -1) {
        arrayAuxinterestsList.splice(index, 1);
      }
      setInterestsList({
        ...interestsState,
        interestsList: arrayAuxinterestsList,
      })
    } else {
      let arrayAuxinterestsList = interestsState.interestsList
      arrayAuxinterestsList.push(interest)
      // console.log("teste")
      // console.log(arrayAuxinterestsList)
      setInterestsList({
        ...interestsState,
        interestsList: arrayAuxinterestsList,
      })
    }
    // console.log("interestsList: ")
    // console.log(interestsState.interestsList)
    if (!interestsState.loadingInterests) {
      storeInterestsLanguages()
    }
  }

  function handleInputLanguageSearch(text) {
    // console.log("handleInputLanguageSearch")
    // console.log(text)
    setInterestsList({
      ...interestsState,
      languageArray: [],
    })
  }



  const renderItemInterests = ({ item, index }) => {
    // console.log('renderItem')
    // console.log(item)
    // console.log(index)
    return <InterestsList {...item} itemId={index}
      setInterestsList={setInterestsList}
      interestsState={interestsState}
    />;
  };

  const renderItemLanguages = ({ item, index }) => {
    // console.log('renderItem')
    // console.log(item)
    // console.log(index)
    return <LanguagesList {...item} itemId={index}
      setInterestsList={setInterestsList}
      interestsState={interestsState}
    />;
  };

  return (
    < KeyboardAvoidingView >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.containerCenter}>
          <Text style={styles.textStyle}>Quais são seus interesses?</Text>
        </View>

        <View>
          <FlatList
            contentContainerStyle={{ flexGrow: 1, width: "100%" }}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={10}
            data={interestsState.interestsArray}
            extraData={interestsState}
            renderItem={renderItemInterests}
            keyExtractor={(item, index) => index.toString()}
          >
          </FlatList>
        </View>



        <View style={styles.containerCenter}>
          <Text style={styles.textStyle}>Em quais idiomas você consegue se comunicar?</Text>
        </View>

        <TextInput
          style={{ height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, marginHorizontal: 30 }}
          placeholder="Busque um idioma"
          onChangeText={(text) => {
            handleInputLanguageSearch(text)
            setTextLanguage(text)
          }}
          valueLanguage={valueLanguage}>
        </TextInput>

        <View>
          <FlatList
            contentContainerStyle={{ flexGrow: 1, width: "100%" }}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={10}
            data={interestsState.languageArray}
            extraData={interestsState}
            renderItem={renderItemLanguages}
            keyExtractor={(item, index) => index.toString()}
          >
          </FlatList>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSpaceAround: {
    flex: 1,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  textStyle: {
    fontSize: 17,
    lineHeight: 24,
    padding: 10,
    textAlign: 'center',
  }
});

SettingsScreen.navigationOptions = {
  title: 'Interesses',
  headerStyle: {
    backgroundColor: 'black',
    height: 40,
  },
  headerTintColor: '#fff',
};
