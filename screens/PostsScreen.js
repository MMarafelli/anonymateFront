import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  FlatList,
} from "react-native";
import ChatTab from '../components/ChatTab'
import LoadingScreen from '../screens/Loader'

import socket from "../services/SocketConfig";

console.disableYellowBox = true;

export default function PostsScreen(props) {
  // console.log('PostsScreen')
  // console.log(props.navigation.state.key)
  let isSubscribed = false;

  const [userRequest, setUserRequest] = useState({
    loading: true,
    userId: '',
    contactsList: [],
  })

  socket.on('refreshLastMessage', (data) => {
    // refresh last message on contacts
    // console.log('refreshLastMessage')
    let lastMessageConversationId, lastMessage, lastMessageAddAt
    data.map((item) => {
      lastMessageConversationId = item._id
      lastMessage = item.messages
      lastMessageAddAt = item.messageAddAt
    })
    // console.log('--------------')
    let refreshLastMessageArray = userRequest.contactsList
    refreshLastMessageArray.map((item) => {
      if (item.conversationId == lastMessageConversationId) {
        item.messages = lastMessage
        item.messageAddAt = lastMessageAddAt
      }
    })

    // sort array na tela pela hora da mensagem
    // console.log(refreshLastMessageArray)
    if (refreshLastMessageArray.length > 1) {
      refreshLastMessageArray.sort(function (a, b) {
        if (a.messages == undefined || b.messages == undefined) {
          return
        } else {
          let aDate, bDate
          a.messages.map((item) => {
            // console.log('a date ' + item)
            aDate = item.messageAddAt
          })
          b.messages.map((item) => {
            // console.log('b date ' + item)
            bDate = item.messageAddAt
          })
          return new Date(bDate) - new Date(aDate);
        }
      });
    }
    setUserRequest({
      ...userRequest,
      contactsList: refreshLastMessageArray
    })
  })

  async function newMessagesSetter(data) {
    // console.log('newMessagesSetter')
    // console.log(data)
    let contactArray = []
    await data.contacts.map((item) => {
      contactArray.push({
        contactName: item.name,
        contactUsername: item.username,
        contactOnline: item.online,
        contactDescription: item.description,
        contactId: item._id,
      })
    })

    // console.log("contactArray")
    // console.log(contactArray)
    // adiciona data de adição do contato no array que vai gerar lista de contatos
    await contactArray.forEach(obj => {
      const a1Ref = obj.contactId
      // console.log(a1Ref)
      const arr2Obj = data.user.contacts.find(tmp => tmp.contactId === a1Ref)
      if (arr2Obj) obj.addAt = arr2Obj.addAt
    });
    // console.log("//////////////////")
    // console.log(contactArray)
    // adiciona ultima mensagem trocada do contato no array que vai gerar lista de contatos
    await contactArray.forEach(obj => {
      // console.log("contact array")
      const a1Ref = obj.contactId
      data.chating.map((item) => {
        // console.log('item')
        // console.log(item)
        // console.log(a1Ref)
        // console.log(tmp.member1)
        // console.log(tmp.member2)
        const arr2Obj = item.members.find(tmp =>
          (tmp.member1 === a1Ref || tmp.member2 === a1Ref)
        )
        if (arr2Obj) {
          obj.messages = item.messages
          obj.conversationId = item._id
        }
      })
    });

    // sort array na tela pela hora da mensagem
    if (contactArray.length > 1) {
      contactArray.sort(function (a, b) {
        if (a.messages == undefined || b.messages == undefined) {
          return
        } else {
          let aDate, bDate
          a.messages.map((item) => {
            aDate = item.messageAddAt
          })
          b.messages.map((item) => {
            bDate = item.messageAddAt
          })
          return new Date(bDate) - new Date(aDate);
        }
      });
    }

    await props.screenProps.map((item) => {
      item.user.contacts = contactArray
    })
    isSubscribed = true
    setUserRequest({
      loading: false,
      userId: data.user.userId,
      contactsList: contactArray
    })
    // console.log(contactArray)
  }

  async function getProfileImages() {
    // TO DO
    // console.log('getProfileImages')
    //try {
    //  const response = await loginApi.post('/getContacts')
    //  await response.data.contacts.map((item) => {
    //    contactsUser.push(item)
    //    // console.log(item)
    //  })
    //  // console.log('ja era assim------------')
    //  // console.log(contactsUser)
    //  // console.log('ja era assim------------')
    //  props.screenProps.map((item) => {
    //    item.user.contacts = contactsUser
    //  })
    //  // console.log(response.data.userId)
    //  setUserRequest({
    //    loading: false,
    //    userId: response.data.userId,
    //    contactsList: contactsUser
    //  })
    //} catch (_err) {
    //  if (_err.response.status == 400) {
    //    error = _err.response.data.error
    //  } else {
    //    error = _err
    //  }
    //}
  }

  if (!userRequest.loading) {
    getProfileImages()
  }

  async function getContactsList() {
    props.screenProps.map((item) => {
      // console.log('getContactsList')
      // console.log(item.user.userId)
      socket.emit('getLastMessages', (item.user.userId))
      socket.on('getLastMessagesListener', async (data) => {
        // console.log('socket getLastMessagesListener')
        // console.log(data.user._id)
        // console.log('aquiiiiiiiiiiiiiiiiii')
        const resp = await (data)

        if (!isSubscribed && resp != " ") {
          newMessagesSetter(data)
        }
      });
    })
  };

  const renderItem = ({ item }) => {
    // console.log('renderItem')
    // console.log(item)
    // console.log(userRequest.userId)
    return <ChatTab {...item} userId={userRequest.userId} navigation={props.navigation} />;
  };

  // console.log('userRequest')
  // console.log(userRequest.loading)
  // console.log(userRequest)
  if (userRequest.loading) {
    return (
      <LoadingScreen
        startAsync={getContactsList()}
      >
      </LoadingScreen>
    )
  } else {
    return (
      <ScrollView>
        <FlatList
          data={userRequest.contactsList}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        ></FlatList>
      </ScrollView>
    );
  }

}

PostsScreen.navigationOptions = {
  title: 'Mensagens',
  headerStyle: {
    backgroundColor: 'black',
    height: 30,
  },
  headerTitleStyle: {
    marginBottom: 25,
  },
  headerTintColor: '#fff',
};