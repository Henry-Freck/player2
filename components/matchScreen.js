import React, {Component} from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';

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
      <Text style={{color:"white",fontSize:30}}>The Player Name Will Go Here!</Text>
      <Text style={{color:"white",fontSize:30}}>Rank</Text>
      <Text style={{color:"white",fontSize:30}}>The Player Name Will Go Here!</Text>

      <Button title="Yes" onPress={this.yesButton}>Hello there</Button>
      <Button title="No" onPress={this.yesButton}>Hello there</Button>

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
