import React, {Component} from 'react';
import { StyleSheet, View, Text, Button, Alert} from 'react-native';
import AppScreen from './components/appScreen';
import LoadScreen from './components/loadScreen';
import * as Facebook from 'expo-facebook';
import * as SecureStore from "expo-secure-store"


const tokenKeyName = 'token'
export default class App extends Component {

  constructor(){
    super()
    this.state = {
      token: null,
      loading: true
    }
    this.checkForToken()
  }

  async saveTokenToSecureStorage(_token){
    SecureStore.setItegitsync(tokenKeyName, _token)
    this.setState({
      token: _token,
      loading: false
    })
  }

  async checkForToken(){
    let _token = await SecureStore.getItemAsync(tokenKeyName)
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
        const profile = await response.json()
        Alert.alert(profile.name + ' Logged In Correctly')
      }

    }catch({message}){
      console.log(message)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
