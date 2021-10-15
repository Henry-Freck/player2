import React, {Component} from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';
import firebase from 'firebase'
import * as SecureStore from "expo-secure-store"
import { collection, query, where, getDocs } from 'firebase/firestore'

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
  firebase.initializeApp(firebaseConfig);
}

export default class MatchScreen extends Component {
  constructor(){
    super()
    this.state = {
      potentialMatches: [],
    }
  }

  async yesButton(otherUUID){
    let userUUID = await SecureStore.getItemAsync("userUUID")

    
    //enter the code here that runs when the yes button is pressed
    //set our user's "swipedYesOn" array to contain this user
    //set this user's "swipedYesOnBy" array to contain our user
  }

  async noButton(otherUUID){
    //code here that gets performed when the no button is pressed
    //set our user's "swipedNoOn" array to contain this user
    //set this user's "swipedNoOnBy" array to contain our user
  }

  async refreshButton(){
    //get users collection
    let userUUID = await SecureStore.getItemAsync("userUUID")
    const snapshot = firebase.firestore().collection("Users").get()

    //map on distance in rank, probably need rank comparison function
    //sort on mapped distance
    //display first user
  }

  render(){
    return(
    <View style={styles.container}>
      <Text style={{color:"white",fontSize:30}}>The Player Name Will Go Here!</Text>
      <Text style={{color:"white",fontSize:30}}>Rank</Text>
      <Text style={{color:"white",fontSize:30}}>The Player Name Will Go Here!</Text>

      <Button title="Yes" onPress={this.yesButton}>Hello there</Button>
      <Button title="No" onPress={this.noButton}>Hello there</Button>
      <Button title="refresh" onPress={this.refreshButton}>Refresh</Button>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
