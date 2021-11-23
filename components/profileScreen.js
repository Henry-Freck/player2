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
      // selectedItems: [],
      skillLevel: "Iron I",
      mainCharacter: "Astra",
      displayName: "",
      youtubeLink: "",
    }
  }

  componentDidMount() {
    this.populateFieldsFromDB()
  }

  populateFieldsFromDB = async () => {
    let userUUID = await SecureStore.getItemAsync("userUUID")
    var displayName = ""
    var rank = ""
    var main = ""
    var youtubeLink = ""
    if(userUUID != null){
      const user = await firebase.firestore().collection("Users").doc(userUUID).get()
      if("displayName" in user.data()){
        displayName = user.data().displayName
      }
      if("rank" in user.data()){
        rank = user.data().rank
      }
      if("main" in user.data()){
        main = user.data().main
      }
      if("youtubeLink" in user.data()){
        youtubeLink = user.data().youtubeLink
      }
    }

    this.setState({
      skillLevel: rank,
      mainCharacter: main,
      displayName: displayName,
      youtubeLink: youtubeLink,
    })
  }

  

  //  Currently deprecated since we're only doing matchmaking for Valorant for the MVP
  // // helper function to be called by the SectionedMultiSelect for selecting games
  // onGameSelectorItemsChange = (selectedItems) => {
  //   // sets the state property
  //   this.setState({selectedItems})
  //   // TODO: make this function push new selected items to firebase
  // }

  //helper function to be called by the TextInput field for setting display name
  async onDisplayNameChange(newValue){
    let userUUID = await SecureStore.getItemAsync("userUUID")
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

  async onYoutubeLinkChange(newValue){
    this.setState({youtubeLink: newValue})
    let userUUID = await SecureStore.getItemAsync("userUUID");
    if(userUUID !== null){
      firebase.firestore().collection("Users").doc(userUUID).set({
        youtubeLink: newValue,
      }, {merge: true})
          .then( () => {
            console.log("set new youtube link")
          })
    }
    else{
      console.log("userUUID retrieval failed")
    }
  }


  render(){
    return(
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.textInputHeaders}>Riot Name</Text>
        <TextInput
          /*TODO: make the text input field take up the width of the screen, not sure why that isn't working*/
          style={styles.textField}
          onChangeText={text => this.onDisplayNameChange(text)}
          defaultValue={this.state.displayName}
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
        <Text style={styles.pickerHeaders}>Current Rank</Text>

        {/*TODO: add more profile information entry fields (probably some sort of check list for what games, along with a text entry for gamertag, rank, etc. for each game)*/}

        <Picker
          itemStyle = {styles.pickerItems}
          selectedValue={this.state.skillLevel}
          onValueChange={(itemValue) => this.onRankChange(itemValue)}
        >
          <Picker.Item label="Iron 1" value="Iron 1" />
          <Picker.Item label="Iron 2" value="Iron 2" />
          <Picker.Item label="Iron 3" value="Iron 3" />
          <Picker.Item label="Bronze 1" value="Bronze 1" />
          <Picker.Item label="Bronze 2" value="Bronze 2" />
          <Picker.Item label="Bronze 3" value="Bronze 3" />
          <Picker.Item label="Silver 1" value="Silver 1" />
          <Picker.Item label="Silver 2" value="Silver 2" />
          <Picker.Item label="Silver 3" value="Silver 3" />
          <Picker.Item label="Gold 1" value="Gold 1" />
          <Picker.Item label="Gold 2" value="Gold 2" />
          <Picker.Item label="Gold 3" value="Gold 3" />
          <Picker.Item label="Platinum 1" value="Platinum 1" />
          <Picker.Item label="Platinum 2" value="Platinum 2" />
          <Picker.Item label="Platinum 3" value="Platinum 3" />
          <Picker.Item label="Diamond 1" value="Diamond 1" />
          <Picker.Item label="Diamond 2" value="Diamond 2" />
          <Picker.Item label="Diamond 3" value="Diamond 3" />
          <Picker.Item label="Immortal 1" value="Immortal 1" />
          <Picker.Item label="Immortal 2" value="Immortal 2" />
          <Picker.Item label="Immortal 3" value="Immortal 3" />
          <Picker.Item label="Radiant" value="Radiant" />

        </Picker>

        <Text style={styles.pickerHeaders}>Current Main</Text>

        <Picker
          itemStyle = {styles.pickerItems}  
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

        <Text style={styles.pickerHeaders}>Youtube link for highlights</Text>
        <TextInput
            style={styles.textField}
            onChangeText={text => this.onYoutubeLinkChange(text)}
            defaultValue={this.state.youtubeLink}
            placeholder='Enter your Riot Name and discriminator (i.e. John#1234)'
        />


      </ScrollView>
    </View>
    );
  }
}



const styles = StyleSheet.create({
  //Style for the headers on each of the profile information entry fields
  pickerHeaders: {
    color: '#555555',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center', 
    paddingHorizontal: "3%",
    fontSize: 18
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
    width: '95%',
    marginBottom: "7%",
    alignSelf: "center",
    color: "#FFFFFF"
  },
  //style for the View that holds the ScrollView, not even sure if we need this anymore but I don't want to break anything
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: "5%"
  },
  pickerItems:{
    color: "#FFFFFF"
  },
  textInputHeaders: {
    color: '#555555',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center', 
    paddingHorizontal: "3%",
    fontSize: 18,
    marginBottom: "3%"
  },
});
