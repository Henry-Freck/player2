import React, {Component, useState}from 'react';
import { StyleSheet, View, Text, TextInput, Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons'
import firebase from 'firebase'
import { collection, addDoc } from "firebase/firestore"
import {Picker} from '@react-native-picker/picker';
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


//Games to be displayed in the selector
const gameListOptions = [
  { 
    name: 'Games',
    id: 0,
    children:[
      {
        id: '1',
        name: 'Valorant'
      },
      {
        id: '2',
        name: 'League of Legends'
      },
      {
        id: '3',
        name: 'Overwatch'
      },
      {
        id: '4',
        name: 'Counter-Strike: Global Offensive'
      },
    ]
  }
]

export default class ProfileScreen extends Component {
  constructor(){
    super()
    this.state = {
      //selectedItems is the list of games that have been selected
      selectedItems: [],
      skillLevel: "Iron I",
      mainCharacter: "Astra"
    }
  }

  

  //  Currently deprecated since we're only doing matchmaking for Valorant for the MVP
  // // helper function to be called by the SectionedMultiSelect for selecting games
  // onGameSelectorItemsChange = (selectedItems) => {
  //   // sets the state property
  //   this.setState({selectedItems})
  //   // TODO: make this function push new selected items to firebase
  // }

  //helper function to be called by the TextInput field for setting display name
  onDisplayNameChange = (newValue) => {
    //TODO: Make this access the correct user based on username and insert the document if it is not present
    SecureStore.getItemAsync("userUUID").then( (value) => {
      var userUUID = value
    })
    console.log(userUUID)
    if(userUUID !== null){
      firebase.firestore().collection("Users").doc(userUUID).set({
        displayName: newValue,
      }, {merge: true})
      .then( () => {
        console.log("set new display name")
      })
    }
    else{
      console.log("userUUID retrieval failed")
    }
    //Uncomment the below lines to have the document data printed for debugging
    // firebase.firestore().collection("Users").doc(global.userUUID).get().then( (doc) => {
    //   if(!doc.exists) return
    //   console.log("Document data: ", doc.data())
    // })
  }

  //helper function to be called by the TextInput field for setting your in game rank
async onRankChange(newValue){
    this.setState({skillLevel: newValue})
    //TODO: Make this access the correct user based on username and insert the document if it is not present
    let userUUID = await SecureStore.getItemAsync("userUUID");
    console.log(userUUID)
    if(userUUID !== null){
      firebase.firestore().collection("Users").doc(userUUID).set({
        rank: newValue,
      }, {merge: true})
      .then( () => {
        console.log("set new rank")
      })
    }
    else{
      console.log("userUUID retrieval failed")
    }
    //Uncomment the below lines to have the document data printed for debugging
    // firebase.firestore().collection("Users").doc(global.userUUID).get().then( (doc) => {
    //   if(!doc.exists) return
    //   console.log("Document data: ", doc.data())
    // })
  }

  async onMainChange(newValue){
    this.setState({mainCharacter: newValue})
    //TODO: Make this access the correct user based on username and insert the document if it is not present
    let userUUID = await SecureStore.getItemAsync("userUUID");
    console.log(userUUID)
    if(userUUID !== null){
      firebase.firestore().collection("Users").doc(userUUID).set({
        main: newValue,
      }, {merge: true})
      .then( () => {
        console.log("set new main")
      })
    }
    else{
      console.log("userUUID retrieval failed")
    }
    //Uncomment the below lines to have the document data printed for debugging
    // firebase.firestore().collection("Users").doc(global.userUUID).get().then( (doc) => {
    //   if(!doc.exists) return
    //   console.log("Document data: ", doc.data())
    // })
  }


  render(){
    return(
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.fieldHeaders}>Riot Name</Text>
        <TextInput 
          /*TODO: make the text input field take up the width of the screen, not sure why that isn't working*/
          style={styles.textField}
          onChangeText={text => this.onDisplayNameChange(text)}
          //TODO: prefill this field if the user has it set in their firestore document
          placeholder='Enter your Riot Name and discriminator (i.e. John#1234)'
        />
        {/* <Text style={styles.fieldHeaders}>Current Game</Text>
        <SectionedMultiSelect
          items={gameListOptions}
          IconRenderer={Icon}
          uniqueKey='id'
          subKey='children'
          selectText="Select the games you play"
          showDropDowns={false}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onGameSelectorItemsChange}
          selectedItems={this.state.selectedItems}
          showChips={false}
          hideSearch={true}
          single={true}
        /> */}
        <Text style={styles.fieldHeaders}>Current Rank</Text>

        {/*TODO: add more profile information entry fields (probably some sort of check list for what games, along with a text entry for gamertag, rank, etc. for each game)*/}

        <Picker
          selectedValue={this.state.skillLevel}
          onValueChange={(itemValue) => this.onRankChange(itemValue)}
        >
          <Picker.Item label="Iron I" value="Iron I" />
          <Picker.Item label="Iron II" value="Iron II" />
          <Picker.Item label="Iron III" value="Iron III" />
          <Picker.Item label="Bronze I" value="Bronze I" />
          <Picker.Item label="Bronze II" value="Bronze II" />
          <Picker.Item label="Bronze III" value="Bronze III" />
          <Picker.Item label="Silver I" value="Silver I" />
          <Picker.Item label="Silver II" value="Silver II" />
          <Picker.Item label="Silver III" value="Silver III" />
          <Picker.Item label="Gold I" value="Gold I" />
          <Picker.Item label="Gold II" value="Gold II" />
          <Picker.Item label="Gold III" value="Gold III" />
          <Picker.Item label="Platinum I" value="Platinum I" />
          <Picker.Item label="Platinum II" value="Platinum II" />
          <Picker.Item label="Platinum III" value="Platinum III" />
          <Picker.Item label="Diamond I" value="Diamond I" />
          <Picker.Item label="Diamond II" value="Diamond II" />
          <Picker.Item label="Diamond III" value="Diamond III" />
          <Picker.Item label="Immortal" value="Immortal" />
          <Picker.Item label="Radiant" value="Radiant" />

        </Picker>

        <Text style={styles.fieldHeaders}>Current Main</Text>

        <Picker
          selectedValue={this.state.mainCharacter}
          onValueChange={(itemValue) => this.onMainChange(itemValue)}
        >
          <Picker.Item label="Astra" value="Astra" />
          <Picker.Item label="Breach" value="Breach" />
          <Picker.Item label="Brimstone" value="Brimstone" />
          <Picker.Item label="Cypher" value="Cypher" />
          <Picker.Item label="Jett" value="Jett" />
          <Picker.Item label="KAY/O" value="KAY/O" />
          <Picker.Item label="Killjoy" value="Killjoy" />
          <Picker.Item label="Omen" value="Omen" />
          <Picker.Item label="Pheonix" value="Pheonix" />
          <Picker.Item label="Raze" value="Raze" />
          <Picker.Item label="Reyna" value="Reyna" />
          <Picker.Item label="Sage" value="Sage" />
          <Picker.Item label="Skye" value="Skye" />
          <Picker.Item label="Sova" value="Sova" />
          <Picker.Item label="Viper" value="Viper" />
          <Picker.Item label="Yoru" value="Yoru" />

        </Picker>

      </ScrollView>
    </View>
    );
  }
}



const styles = StyleSheet.create({
  //Style for the headers on each of the profile information entry fields
  fieldHeaders: {
    color: '#555555',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center'
  },
  //Style for the scroll view that will contain all the information entry fields
  scrollView: {
    flex: 1,
//     borderWidth: 10,
//     borderColor: "#f2f2f2",
    width: "100%",
// //    justifyContent: 'flex-start',
//     flexDirection: 'row',
// //    alignItems: 'flex-start'
  },
  //Style for any text entry fields for entering profile information
  textField: {
    borderWidth: 1,
    padding: 10,
    borderColor: '#555555',
    width: '100%',
  },
  //style for the View that holds the ScrollView, not even sure if we need this anymore but I don't want to break anything
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
