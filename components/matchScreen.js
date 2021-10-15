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

  rankDistance(rank1, rank2){
    let rank1Int = rankToInt(rank1)
    let rank2Int = rankToInt(rank2)
    return (rank2Int - rank1Int)

  }

  rankToInt(rank){
    if(rank === "Iron 1"){
      return 0
    }else if(rank === "Iron 2"){
    return 1
    }else if(rank === "Iron 3"){
      return 2
    }else if(rank === "Bronze 1"){
      return 3
    }else if(rank === "Bronze 2"){
      return 4
    }else if(rank === "Bronze 3"){
      return 5
    }else if(rank === "Silver 1"){
      return 6
    }else if(rank === "Silver 2"){
      return 7
    }else if(rank === "Silver 3"){
      return 8
    }else if(rank === "Gold 1"){
      return 9
    }else if(rank === "Gold 2"){
      return 10
    }else if(rank === "Gold 3"){
      return 11
    }else if(rank === "Platinum 1"){
      return 12
    }else if(rank === "Platinum 2"){
      return 13
    }else if(rank === "Platinum 3"){
      return 14
    }else if(rank === "Diamond 1"){
      return 15
    }else if(rank === "Diamond 2"){
      return 16
    }else if(rank === "Diamond 3"){
      return 17
    }else if(rank === "Immortal 1"){
      return 18
    }else if(rank === "Immortal 2"){
      return 19
    }else if(rank === "Immortal 3"){
      return 20
    }else if(rank === "Radiant"){
      return 21
    }
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
