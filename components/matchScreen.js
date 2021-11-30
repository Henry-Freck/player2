import React, {Component} from 'react';
import { StyleSheet, View, Text, Button, Alert,TouchableOpacity, Image} from 'react-native';
import firebase from 'firebase'
import * as SecureStore from "expo-secure-store"
import { collection, query, where, getDocs, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { withNavigation } from "react-navigation";



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

function rankDistance(rank1, rank2){
  let rank1Int = rankToInt(rank1)
  let rank2Int = rankToInt(rank2)
  return Math.abs(rank2Int - rank1Int)
}

function rankToInt(rank){
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
      myRank: "Iron 1",
      matchIndex: 0,
      matchId: "null",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/player2-5b498.appspot.com/o/images%2Ftest-image?alt=media&token=bf60b066-5000-4e8a-bfb7-a187bdbd873e"
    }
  }

  yesButton = async () => {
    let userUUID = await SecureStore.getItemAsync("userUUID")
    var otherUUID = this.state.matchIds[this.state.matchIndex]
    // console.log(otherUUID)
    // console.log(typeof(otherUUID))
    var otherUser = await firebase.firestore().collection("Users").doc(otherUUID).get()
    if(userUUID != null){
      // console.log(typeof(otherUser.data()))
      if("swipedYesOn" in otherUser.data() && otherUser.data().swipedYesOn.includes(userUUID)){
        Alert.alert("You matched with " + otherUser.data().displayName + "!\nAdd them now to start playing!")
      }
      let db = firebase.firestore()
      const FieldValue = firebase.firestore.FieldValue
      let ourDocRef = db.collection("Users").doc(userUUID)
      let updateOurList = ourDocRef.update("swipedYesOn", FieldValue.arrayUnion(otherUUID))
      let otherDocRef = db.collection("Users").doc(otherUUID)
      let updateOtherList = otherDocRef.update("swipedYesOnBy", FieldValue.arrayUnion(userUUID))
      let me = await firebase.firestore().collection("Users").doc(userUUID).get()
      let curRank = me.data().rank
      if(curRank !== this.state.myRank){
        this.refreshButton()
      }else{
      var mInd = this.state.matchIndex + 1
      var matches = this.state.potentialMatches

      var imagePostfix;
    if (matches[mInd].imageTag != null){
      imagePostfix = matches[mInd].imageTag
    }else{
      imagePostfix = "test-image"
    }

    let imageRef = await firebase.storage().ref('/images/' + imagePostfix);
    imageRef
      .getDownloadURL()
      .then((url) => {
        //from url you can fetched the uploaded image easily
        this.setState({imageUrl: url});
      })
      .catch((e) => console.log('getting downloadURL of image error => ', e));

      this.setState({
        matchIndex: mInd,
        currentMatch: matches[mInd]

      })
    }
    }
    else{
      console.log("failed to retrieve userUUID")
    }
  }

  noButton = async (otherUUID) => {
    let userUUID = await SecureStore.getItemAsync("userUUID")
    console.log(userUUID)
    var otherUUID = this.state.matchIds[this.state.matchIndex]
    if(userUUID != null){
      let db = firebase.firestore()
      const FieldValue = firebase.firestore.FieldValue
      let ourDocRef = await db.collection("Users").doc(userUUID)
      let updateOurList = await ourDocRef.update("swipedNoOn", FieldValue.arrayUnion(otherUUID))
      let otherDocRef = await db.collection("Users").doc(otherUUID)
      let updateOtherList = await otherDocRef.update("swipedNoOnBy", FieldValue.arrayUnion(userUUID))
      let me = await firebase.firestore().collection("Users").doc(userUUID).get()
      let curRank = me.data().rank
      if(curRank !== this.state.myRank){
        this.refreshButton()
      }else{
        var mInd = this.state.matchIndex + 1
        var matches = this.state.potentialMatches

        var imagePostfix;
        if (matches[mInd].imageTag != null){
          imagePostfix = matches[mInd].imageTag
        }else{
          imagePostfix = "test-image"
        }

        let imageRef = await firebase.storage().ref('/images/' + imagePostfix);
        imageRef
          .getDownloadURL()
          .then((url) => {
            //from url you can fetched the uploaded image easily
            this.setState({imageUrl: url});
          })
          .catch((e) => console.log('getting downloadURL of image error => ', e));

          this.setState({
            matchIndex: mInd,
            currentMatch: matches[mInd]
          })
      }
    }else{
      console.log("failed to retrieve userUUID")
    }
  }

  addTestUsers = async () => {
    for(var i = 0; i < 200; i++){
      const names = ["James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"]
      const characters = ["Astra", "Breach", "Brimstone", "Cypher", "Jett", "KAY/O", "Killjoy", "Omen", "Pheonix", "Raze", "Reyna", "Sage", "Skye", "Sova", "Viper", "Yoru"]
      const ranks = ["Iron 1", "Iron 2" ,"Iron 3", "Bronze 1", "Bronze 2", "Bronze 3", "Silver 1", "Silver 2", 'Silver 3', 'Gold 1', "Gold 2", "Gold 3", "Platinum 1", "Platinum 2", "Platinum 3", "Diamond 1", "Diamond 2", "Diamond 3", "Immortal 1", "Immortal 2" ,"Immortal 3", "Radiant"]
      const images = ["valorant-scoreboard-2.png", "gun_sight.jpg", "lazer.jpg", "gold2.png"]
      var docName = "TestUser" + i
      var display = names[i%20] + (i%20)
      firebase.firestore().collection("Users").doc(docName).set({
        displayName: display,
        main: characters[i%16],
        rank: ranks[i%22],
        imageTag: images[i%4]
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
    var MyRank = "Iron 1"
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
        MyRank = doc.data().rank
        // console.log(MyRank)
      }
      // console.log(doc.data())
    })
    await matches.sort(function(user1, user2){
      let rank1 = user1.rank
      let rank2 = user2.rank
      if(rank1 == rank2){
        return 0
      }else{
        if(rankDistance(rank1, MyRank)>rankDistance(rank2, MyRank)){
          return 1
        }else{
          return -1
        }
      }
    })
    // console.log("sorted jaunt")
    // console.log(matches)
    matches.forEach((match) => {
      // console.log("found match")
      // console.log(match)
      // console.log(match.rank)
    })
    var id = matches[0].id
    var imagePostfix;
    if (matches[0].imageTag != null){
      imagePostfix = matches[0].imageTag
    }else{
      imagePostfix = "test-image"
    }

    let imageRef = firebase.storage().ref('/images/' + imagePostfix);
    imageRef
      .getDownloadURL()
      .then((url) => {
        //from url you can fetched the uploaded image easily
        this.setState({imageUrl: url});
      })
      .catch((e) => console.log('getting downloadURL of image error => ', e));

    this.setState({
      potentialMatches: matches,
      matchIndex: 0,
      currentMatch: matches[0],
      matchIds: ids,
      matchId: ids[0], 
      myRank: MyRank
    })
  }

  render(){
    return(
    <View style={styles.container}>
      <View style = {styles.info}>
        <Text style={{color:"grey",fontSize:30}}>{this.state.currentMatch.displayName}</Text>


        <Image style = {styles.Image} source = {{uri: this.state.imageUrl}}></Image>

        <Text style={{color:"grey",fontSize:30}}>{this.state.currentMatch.rank} | {this.state.currentMatch.main}</Text>
        {/* <Text style={{color:"white",fontSize:30}}>{this.state.currentMatch.main}</Text> */}

      
        
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
    // fontSize: 25
  },
  Image:{
    width: 400,
    height: 350,
    marginVertical: "7%"
  }
  

});
