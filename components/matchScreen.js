import React, {Component} from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase'
import * as SecureStore from "expo-secure-store"

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
  async yesButton(){
    //enter the code here that runs when the yes button is pressed
  }

  async noButton(){
    //code here that gets performed when the no button is pressed
  }

  render(){
    return(
    <View style={styles.container}>
      <View style={styles.playerInfo}>
        <Text style={{color:"white",fontSize:30}}>The Player Name Will Go Here!</Text>
        <Text style={{color:"white",fontSize:30}}>Rank</Text>
        <Text style={{color:"white",fontSize:30}}>The player role will go here</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style = {styles.noButton} onPress = {this.noButton}>
          <Text sytle = {styles.noText}>NO</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.noButton} onPress = {this.yesButton}>
          <Text sytle = {styles.noText}>YES</Text>
        </TouchableOpacity>
      </View>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  playerInfo: {
    flex:1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: 'center'
  },
  buttons: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    

  },
  noButton: {
    backgroundColor: "white",
    padding: 20,
    paddingRight: 60,
    paddingLeft: 60
  


  },
  noText: {

  }
});
