import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, View, Text, Image, Dimensions, ScrollView, StyleSheet } from 'react-native';;

import InputConponentNewMessage from "../components/InputComponentNewMessage"

import socket from "../services/SocketConfig";
import { cos } from 'react-native-reanimated';

const icon = require('../assets/custom-icons/iconeAnonymateActive.png')
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function StartChatingScreen(props) {

  const [valueText, setText] = useState('');

  const [loading, setLoading] = useState(true);

  const [messages, setMessages] = useState({ messagesInProgress: [] });

  const [sendMessageStatus, setSendMessageStatus] = useState(false)

  function textHandler() {
    let textSize = valueText.replace(/\s/g, '').split('').length
    let textSizeWithSpaces = valueText.split('').length
    // console.log(textSize)
    // console.log(textSizeWithSpaces)
    if (textSize > 0 && textSizeWithSpaces > 10 && textSizeWithSpaces < 500 && messages.messagesInProgress.length <= 3) {
      // console.log('entrou')
      setSendMessageStatus(true)
    } else {
      // console.log('entrou 2')
      setSendMessageStatus(false)
    }
  }

  if (valueText.split('').length == 0 && messages.messagesInProgress.length == 0 && loading) {
    socket.emit('getNotDeliveredMessages')
  }


  async function sendMessage() {
    if (sendMessageStatus == true) {
      setText('')
      socket.emit('createConversation', valueText)
    }
    // console.log(valueText)
  }

  useEffect(() => {
    setLoading(false)
    socket.on('newCreatedMessageListener', (data) => {
      // console.log('teste emit')
      // console.log(data)
      let auxArray = messages.messagesInProgress
      auxArray.push(data)
      // console.log('auxArray')
      // console.log(auxArray)
      setMessages({
        messagesInProgress: auxArray
      })
    })

    socket.on('getNotDeliveredMessagesListener', (data) => {
      // console.log('teste getNotDeliveredMessagesListener')
      let auxArray = messages.messagesInProgress
      data.map((item) => {
        auxArray.push(item)
      })
      // console.log('auxArray')
      // console.log(auxArray)
      // setMessages({
      //   messagesInProgress: auxArray
      // })
    })

  }, []);

  function getDateHour(date) {
    if (typeof (date) != 'undefined') {
      date = new Date(date)

      let today = new Date()

      let day = ("0" + date.getDate()).slice(-2) + ""
      let month = ("0" + (date.getMonth() + 1)).slice(-2) + ""
      let year = date.getFullYear().toString().substr(-2) + ""
      let hour = ("0" + (date.getHours())).slice(-2) + ""
      let minutes = ("0" + (date.getMinutes())).slice(-2) + ""

      let messageTime = hour + ":" + minutes + "h " + day + "/" + month + "/" + year

      function addDays(date, days) {
        const copy = new Date(Number(date))
        copy.setDate(date.getDate() + days)
        return copy
      }
      const threeDaysAhead = addDays(date, 3);

      let endDay = ("0" + threeDaysAhead.getDate()).slice(-2) + ""
      let endMonth = ("0" + (threeDaysAhead.getMonth() + 1)).slice(-2) + ""
      let endYear = threeDaysAhead.getFullYear().toString().substr(-2) + ""
      let endHour = ("0" + (threeDaysAhead.getHours())).slice(-2) + ""
      let endMinutes = ("0" + (threeDaysAhead.getMinutes())).slice(-2) + ""

      let endGame = endHour + ":" + endMinutes + "h " + endDay + "/" + endMonth + "/" + endYear

      console.log(endGame)

      // console.log('todayDDMMYY ' + todayDDMMYY)
      // console.log('yesterdayDDMMYY ' + yesterdayDDMMYY)
      // console.log('lastMessageDDMMYY ' + lastMessageDDMMYY)
      return {
        messageTime: messageTime,
        endGame: endGame
      }
    } else {
      return ' '
    }
  }



  let info = [];
  if (messages.messagesInProgress.length == 0) {
    info = [
      <View key={1} style={styles.placeholderInfo}>
        <Image
          source={icon}
          style={styles.img}
        />
        <View style={styles.info}>
          <Text>Enquanto suas mensagens navegam, elas aparecerão aqui!</Text>
          <Text></Text>
          <Text>Depois de um tempo, elas podem se perder ou irão aparecer com a resposta de alguém no seu chat!</Text>
          <Text></Text>
          <Text>As mensagens só poderão ser enviadas quando a borda da caixa de texto ficar verde, para isso, digite de 50 a 500 caracteres. </Text>
        </View>
      </View>
    ]
  } else {
    // console.log('messages array')
    messages.messagesInProgress.map((item, index) => {
      info.push(
        <View key={index} style={styles.boxMessage}>
          <Image
            source={icon}
            style={styles.img}
          />
          <View style={styles.info}>
            <Text>Mensagem enviada em: {getDateHour(item.messages[0].messageAddAt).messageTime}</Text>
            <Text>Se perderá em: {getDateHour(item.messages[0].messageAddAt).endGame}</Text>
          </View>
        </View>
      )
    })
    info.reverse();
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={styles.progressArea}>
        {info}
      </ScrollView>
      <InputConponentNewMessage
        style={styles.textInput}
        onChangeText={(text) => { setText(text), textHandler() }}
        valueText={valueText}
        sendMessageStatus={sendMessageStatus}
        sendMessage={sendMessage}
      />
    </KeyboardAvoidingView>
  );
}

StartChatingScreen.navigationOptions = {
  title: 'Enviar mensagem',
  headerStyle: {
    backgroundColor: 'black',
    height: 30,
  },
  headerTitleStyle: {
    marginBottom: 25,
  },
  headerTintColor: '#fff',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    padding: 0,
    paddingTop: 0,
    width: '100%',
    justifyContent: "flex-end",
  },
  textInput: {

  },
  progressArea: {

  },
  boxMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 200,
    minHeight: 70,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    borderColor: "transparent",
    width: screenWidth - 20,
    backgroundColor: '#ffe3e3',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  placeholderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 200,
    minHeight: 70,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "transparent",
    width: screenWidth - 20,
    backgroundColor: '#ffe3e3',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  info: {
    width: 0,
    flexGrow: 1,
  },
  img: {
    width: 70,
    height: 70,
    marginLeft: -15,
  }
});
