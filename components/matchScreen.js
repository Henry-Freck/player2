import React, {Component} from 'react';
import { StyleSheet, View, Text, Button, Alert} from 'react-native';
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

export default class MatchScreen extends Component {
  componentDidMount(){
    constructor()
  }

  constructor(){
    super()
    this.state = {
      potentialMatches: [],
      matchIds: [],
      currentMatch: {
        displayName: "Hit Refresh!",
        rank: "N/A",
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

  refreshButton = async () => {
    //get users collection
    let userUUID = await SecureStore.getItemAsync("userUUID")
    const snapshot = await firebase.firestore().collection("Users").get()
    //map on distance in rank, probably need rank comparison function
    var matches = []
    var ids = []
    var myRank = "none"
    snapshot.forEach((doc) => {
      if(doc.id !== userUUID){
        matches.push(doc.data())
        ids.push(doc.id)
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
      <Text style={{color:"white",fontSize:30}}>{this.state.currentMatch.displayName}</Text>
      <Text style={{color:"white",fontSize:30}}>{this.state.currentMatch.rank}</Text>
      {/* <Text style={{color:"white",fontSize:30}}>The Player Name Will Go Here!</Text> */}

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
