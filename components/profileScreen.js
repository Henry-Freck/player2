import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class ProfileScreen extends Component {
  render(){
    return(
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.fieldHeaders}>Display Name</Text>
        <TextInput 
          //TODO: make the text input field take up the width of the screen, not sure why that isn't working
          style={styles.textField}
          onChangeText={text => this.onDisplayNameChange(text)}
        />
        <Text style={styles.fieldHeaders}>Game Selector</Text>
        
        {/*TODO: add more profile information entry fields (probably some sort of check list for what games, along with a text entry for gamertag, rank, etc. for each game)*/}        
      </ScrollView>
      {/*<Text style={{color:"white",fontSize:30}}>Edit and view your profile and preferences on this screen</Text>*/}
    </View>
    );
  }
}

function onDisplayNameChange(newValue){
  //TODO: make this send the new display name to firebase
}

const styles = StyleSheet.create({
  //Style for the headers on each of the profile information entry fields
  fieldHeaders: {
    color: '#555555',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  //Style for the scroll view that will contain all the information entry fields
  scrollView: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start'
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
