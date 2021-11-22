import React, {Component} from 'react';
import { StyleSheet, View, Text, Button, Alert,TouchableOpacity} from 'react-native';
import firebase from 'firebase'
import * as SecureStore from "expo-secure-store"
import { collection, query, where, getDocs, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants'

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

export default class MatchScreen extends Component {
  componentDidMount(){
    constructor()
    this.refreshButton()
  }

  constructor(){
    super()
    this.state = {
      potentialMatches: [],
      matchIds: [],
      currentMatch: {
        displayName: "Loading",
        rank: "",
        id: "null"
      },
      matchIndex: 0,
      matchId: "null"
    }
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

  yesButton = async () => {
    let userUUID = await SecureStore.getItemAsync("userUUID")
    var otherUUID = this.state.matchIds[this.state.matchIndex]
    console.log(otherUUID)
    console.log(typeof(otherUUID))
    var otherUser = await firebase.firestore().collection("Users").doc(otherUUID).get()
    if(userUUID != null){
      console.log(typeof(otherUser.data()))
      if("swipedYesOn" in otherUser.data() && otherUser.data().swipedYesOn.includes(userUUID)){
        Alert.alert("You matched with " + otherUser.data().displayName + "!\nAdd them now to start playing!")
      }
      let db = firebase.firestore()
      const FieldValue = firebase.firestore.FieldValue
      let ourDocRef = db.collection("Users").doc(userUUID)
      let updateOurList = ourDocRef.update("swipedYesOn", FieldValue.arrayUnion(otherUUID))
      let otherDocRef = db.collection("Users").doc(otherUUID)
      let updateOtherList = otherDocRef.update("swipedYesOnBy", FieldValue.arrayUnion(userUUID))
      var mInd = this.state.matchIndex + 1
      var matches = this.state.potentialMatches
      this.setState({
        matchIndex: mInd,
        currentMatch: matches[mInd]
      })
    }
    else{
      console.log("failed to retrieve userUUID")
    }
  }

  noButton = async (otherUUID) => {
    let userUUID = await SecureStore.getItemAsync("userUUID")
    var otherUUID = this.state.matchIds[this.state.matchIndex]
    if(userUUID != null){
      let db = firebase.firestore()
      const FieldValue = firebase.firestore.FieldValue
      let ourDocRef = db.collection("Users").doc(userUUID)
      let updateOurList = ourDocRef.update("swipedNoOn", FieldValue.arrayUnion(otherUUID))
      let otherDocRef = db.collection("Users").doc(otherUUID)
      let updateOtherList = otherDocRef.update("swipedNoOnBy", FieldValue.arrayUnion(userUUID))
      var mInd = this.state.matchIndex + 1
      var matches = this.state.potentialMatches
      this.setState({
        matchIndex: mInd,
        currentMatch: matches[mInd]
      })
    }
    else{
      console.log("failed to retrieve userUUID")
    }
  }

  addTestUsers = async () => {
    for(var i = 5; i < 200; i++){
      var docName = "TestUser" + i
      var display = "Test User" + i + "#5555"
      firebase.firestore().collection("Users").doc(docName).set({
        displayName: display,
        main: "Yoru",
        rank: "Radiant",
      }, {merge: true}).then( () => {
        console.log("Added new test user with display name " + display + " to the database")
      })
    }
  }

  refreshButton = async () => {
    //get users collection
    let userUUID = await SecureStore.getItemAsync("userUUID")
    const snapshot = await firebase.firestore().collection("Users").get()
    var matches = []
    var ids = []
    var myRank = "none"
    snapshot.forEach((doc) => {
      if(doc.id !== userUUID){
        //check if we've swiped on this person before, if not they're a potential match
        if( ("swipedNoOn" in doc.data() && !(userUUID in doc.data().swipedNoOn)) ||
            ("swipedNoOnBy" in doc.data() && !(userUUID in doc.data().swipedNoOnBy)) ||
            // ("swipedYesOn" in doc.data() && !(userUUID in doc.data().swipedYesOn)) ||
            ("swipedYesOnBy" in doc.data() && !(userUUID in doc.data().swipedYesOnBy))){
          //do nothing here, it was easier to put the logic in the else than try to negate this hideous conditional
        }
        else{
          matches.push(doc.data())
          ids.push(doc.id)
        }
      }
      else{
        myRank = doc.data().rank
        // console.log(myRank)
      }
      // console.log(doc.data())
    })
    // matches.sort((match) => {
    //   rank = match.rank
    //   console.log(match)
    //   console.log(typeof(rank))
    //   console.log(typeof(myRank))
    //   // try{
    //     var rankDist = this.rankDistance(myRank, rank)
    //   // }catch(e){
    //     // console.log(e)
    //   // }
    //   return rankDist
    // })
    // matches.forEach((match) => {
    //   console.log("found match")
    //   console.log(match)
    //   console.log(match.rank)
    // })
    var id = matches[0].id
    this.setState({
      potentialMatches: matches,
      matchIndex: 0,
      currentMatch: matches[0],
      matchIds: ids,
      matchId: ids[0] 
    })
  }

  render(){
    return(
    <View style={styles.container}>
      <View style = {styles.info}>
        <Text style={{color:"white",fontSize:30}}>{this.state.currentMatch.displayName}</Text>
        <Text style={{color:"white",fontSize:30}}>{this.state.currentMatch.rank}</Text>
        <Text style={{color:"white",fontSize:30}}>{this.state.currentMatch.main}</Text>
      </View>
      <View style = {styles.buttonsView}>
        <TouchableOpacity style = {styles.button} onPress = {this.noButton}>
          <Ionicons name="thumbs-down" style={styles.buttonContent}/>
          {/* <Text style={styles.buttonContent}>NO</Text> */}
        </TouchableOpacity>
        <View style = {styles.space}/>
        <TouchableOpacity style = {styles.button} onPress = {this.yesButton}>
          {/* <Text style={styles.buttonContent}>YES</Text> */}
          <Ionicons name="thumbs-up" style={styles.buttonContent} />
        </TouchableOpacity>
        {/*<Button title="refresh" onPress={this.refreshButton}>Refresh</Button>*/}
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black',
    justifyContent: "center",
    alignItems:"center"
  },
  buttonsView: {
    position:"absolute",
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
    bottom: "7%",
    
  },
  button:{
    backgroundColor: "green",
    borderRadius: 50,
    borderWidth:0,
    padding:10,
    margin:2,
    width:"45%"

  },
  info: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center',
    paddingBottom: "30%"
  },
  space:{
    width: "4%"
  },
  buttonContent:{
    margin: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25
  }
  

});
