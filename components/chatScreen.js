import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList, Button} from 'react-native';
import firebase from 'firebase'
import * as SecureStore from "expo-secure-store"
import { collection, query, where, getDocs, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB8pxsOuMbDeJvX9dqzymkRROLIGZtSwAY",
  authDomain: "player2-5b498.firebaseapp.com",
  projectId: "player2-5b498",
  storageBucket: "player2-5b498.appspot.com",
  messagingSenderId: "77036678316",
  appId: "1:77036678316:web:1ef62b94cff22f3eed0309",
  measurementId: "G-YB0ZG7T821"
};

//initialize firebase
if (firebase.apps.length == 0) {
  var app = firebase.initializeApp(firebaseConfig);
}

function hackyListContains(list, item) {
  var returned = false
  list.forEach(i => {
    if(i === item){
      returned = true
    }
    // var valid = true
    // for(var n = 0; n < i.length; n++){
    //   if(i.charCodeAt(n) != item.charCodeAt(n)){
    //     valid = false
    //   }
    // }
    // if(valid){
    //   returned = true
    // }
  })
  return returned
}

export default class ChatScreen extends Component {
  componentDidMount(){
    constructor()
  }

  constructor(){
    super()
    this.state= {
      matches: [],
    }
  }

  refreshButton = async () => {
    //get users collection
    let userUUID = await SecureStore.getItemAsync("userUUID")
    const user = await firebase.firestore().collection("Users").doc(userUUID).get()
    if(userUUID !== null){
      if("swipedYesOn" in user.data() && "swipedYesOnBy" in user.data()){
        const yesOn = user.data().swipedYesOn;
        const yesOnBy = user.data().swipedYesOnBy;
        var matchList = []
        yesOnBy.forEach(m => {
          console.log(m)
          // if(m in yesOnBy){
          if(hackyListContains(yesOn, m)){
            console.log("found match")
            matchList.push(m)
          }
          else{
            console.log("yesOn doesn't contain " + m)
          }
        })
      }

      var readableMatchList = []
      console.log("matchList length: " + matchList.length)
      for(var i = 0; i < matchList.length; i++){
        console.log("attempting to fetch user data for user: " + matchList[i])
        const otherUser = await firebase.firestore().collection("Users").doc(matchList[i]).get()
        console.log("got other user")
        if("displayName" in otherUser.data() && "rank" in otherUser.data()){
          var displayText = otherUser.data().displayName + " | " + otherUser.data().rank
          console.log(displayText)
          readableMatchList.push({key: displayText})
        }

      }

      this.setState({
        matches: readableMatchList,
      })
    }
  }

  render(){
    return(
    <View style={styles.container}>
        <FlatList
            data={this.state.matches}
        //   data={[   ///fill in data here with matches
        //   {key: 'Devin'},
        //   {key: 'Dan'},
        //   {key: 'Dominic'},
        //   {key: 'Jackson'},
        //   {key: 'James'},
        //   {key: 'Joel'},
        //   {key: 'John'},
        //   {key: 'Jillian'},
        //   {key: 'Jimmy'},
        //   {key: 'Julie'},
        // ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
      <Button title="refresh" onPress={this.refreshButton}>Refresh</Button>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  item:{
    color: 'white',
    fontSize: 40,
    paddingTop: "5%"
  }
});
