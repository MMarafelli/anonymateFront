import React from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  Image
} from "react-native"
import { Ionicons } from '@expo/vector-icons'
import chatTabStyle from '../style/chatTabStyle'
import { NavigationActions } from 'react-navigation'

async function onPress(props) {
  // console.log('pressionou')
  // console.log(props.navigation.state.key)
  try {
    global.stackNavigator.dispatch(
      NavigationActions.navigate({
        routeName: 'ChatScreen',
        params: {
          goBackKey: props.navigation.state.key,
          userId: props.userId,
          conversationId: props.conversationId,
          friend: {
            displayname: props.contactName,
            contactId: props.contactId,
            displaypic: props.picture
          }
        },
      }),
    )
  } catch (erro) {
    console.log('erro dispatch')
    console.log(erro)
  }
}

function getDateHour(props) {
  let date
  if (typeof (props.messages) != 'undefined') {
    props.messages.map((item) => {
      date = new Date(item.messageAddAt)
    })

    let today = new Date()

    let todayDay = ("0" + today.getDate()).slice(-2) + ""
    let todayMonth = ("0" + (today.getMonth() + 1)).slice(-2) + ""
    let todayYear = today.getFullYear().toString().substr(-2) + ""

    let todayDDMMYY = todayDay + '/' + todayMonth + '/' + todayYear

    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))

    let yesterdayDay = ("0" + yesterday.getDate()).slice(-2) + ""
    let yesterdayMonth = ("0" + (yesterday.getMonth() + 1)).slice(-2) + ""
    let yesterdayYear = yesterday.getFullYear().toString().substr(-2) + ""

    let yesterdayDDMMYY = yesterdayDay + '/' + yesterdayMonth + '/' + yesterdayYear

    let day = ("0" + date.getDate()).slice(-2) + ""
    let month = ("0" + (date.getMonth() + 1)).slice(-2) + ""
    let year = date.getFullYear().toString().substr(-2) + ""
    let hour = ("0" + (date.getHours())).slice(-2) + ""
    let minutes = ("0" + (date.getMinutes())).slice(-2) + ""

    let messageTime = hour + ":" + minutes

    let lastMessageDDMMYY = day + '/' + month + '/' + year

    // console.log('todayDDMMYY ' + todayDDMMYY)
    // console.log('yesterdayDDMMYY ' + yesterdayDDMMYY)
    // console.log('lastMessageDDMMYY ' + lastMessageDDMMYY)
    if (lastMessageDDMMYY == todayDDMMYY) {
      return messageTime
    } else if (lastMessageDDMMYY == yesterdayDDMMYY) {
      return 'ontem'
    } else {
      return lastMessageDDMMYY
    }
  } else {
    return ' '
  }
}


function getLastMessage(props) {
  let message
  if (typeof (props.messages) != 'undefined') {
    props.messages.map((item) => {
      message = '  ' + item.message
    })
    let messageLength = message.split('').length
    // console.log(messageLength)
    if(messageLength > 20 ){
      message = message.substring(0,19) + '...'
    }
    return message
  } else {
    return ' Conversa vazia'
  }
}

function display(props) {
  console.log('chattab props')
  console.log(props.Object)
}

const ChatTab = props => (
  <TouchableOpacity onPress={() => { onPress(props) }}>
    <View style={chatTabStyle.row}>
      <View>
        <View style={chatTabStyle.nameContainerTime}>
          <View style={chatTabStyle.nameContainer}>
            <Image
              style={chatTabStyle.pic}
              source={require('../assets/images/default.jpeg')}
            // source={{
            //   uri:
            //     'data:image/pngbase64,' + props.picture,
            // }}
            />
            <Text style={chatTabStyle.nameTxt}>{props.contactName}</Text>
          </View>
        </View>
        <View style={chatTabStyle.msgContainer}>
          <Text style={chatTabStyle.msgTxt}>
            <Ionicons
              name={'ios-checkmark-circle-outline'} size={15} color="#b3b3b3"
              style={{ marginLeft: 15, marginRight: 5 }}
            />
            {getLastMessage(props)}
          </Text>
          <Text style={chatTabStyle.time}>{getDateHour(props)}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity >
)

export default ChatTab