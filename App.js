import React, {Component} from 'react';
import { StyleSheet, View, Text, Button, Alert} from 'react-native';
import AppScreen from './components/appScreen';
import LoadScreen from './components/loadScreen';
import * as Facebook from 'expo-facebook';
import * as SecureStore from "expo-secure-store"
import firebase from "firebase"

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

const tokenKeyName = 'token'
export default class App extends Component {

  constructor(){
    super()
    this.state = {
      token: null,
      loading: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.checkForToken();
    }, 2000);
    this.checkForFirebaseCredential();
    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        console.log('We are authenticated now!');
        Alert.alert('We authneticated with Fireabse!', `Hi ${JSON.stringify(user)}`);
      }
    });
  }

  async checkForToken(){
    let _token = await SecureStore.getItemAsync(tokenKeyName)
    this.setState({
      token: _token,
      loading: false
    })
  }

  async checkForFirebaseCredential() {
    let credential = await SecureStore.getItemAsync('firebaseCredential');
    if (credential) {
      firebase
        .auth()
        .signInWithCredential(credential)
        .catch(error => {
          console.log('Auth failed and here the error' + JSON.stringify(error));
        });
    }
  }

  async saveTokenToSecureStorage(_token, credential){
    SecureStore.setItemAsync("token", _token)
    SecureStore.setItemAsync("firebaseCredential", credential)
    this.setState({ 
      token: _token,
      loading: false
    })
  }

  render(){
    if(this.state.loading === true){
      return(
        <LoadScreen/>
      );
    }
    if(this.state.token === null){
      return(
        <View style = {styles.container}>
        <Button title= "Login with Facebook" onPress = {()=>{this.logIn()}}></Button> 
        </View>
      );
    }else{
      return(
      <AppScreen/>
      );
    }
  }

  async logIn(){
    try{
      await Facebook.initializeAsync({appId: '886430345317387', appName: "Player2" })
      const {type, token} = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile']
      }) 

      if (type === "success"){
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
        this.saveTokenToSecureStorage(token)
        let credential = firebase.auth.FacebookAuthProvider.credential(token)
        firebase.auth().signInWithCredential(credential).catch((error)=>{
          console.log("Auth failed with error " + JSON.stringify(error))
        })
        const profile = await response.json()
        Alert.alert(profile.name + ' Logged In Correctly')
        //TODO: once user is logged in, check firebase to see if they exist yet
        //if they do: pull the UUID for the user and store it in a variable that we can access from other components
        //if not: create a new UUID for the user and then do the same as above
      }

    }catch({message}){
      console.log(message)
    }
  }

  // async fakeLogIn(){
  //   this.saveTokenToSecureStorage("fake_token")
  //   Alert.alert("TestUser Logged in Correctly")
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});