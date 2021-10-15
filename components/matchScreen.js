import React, {Component} from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class MatchScreen extends Component {

yesButton = () => {
  //enter the code here that runs when the yes button is pressed
}

noButton = () =>{
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
