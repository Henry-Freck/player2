import React, {Component} from 'react';
import { StyleSheet, View, Text} from 'react-native';

export default class ChatScreen extends Component {
  render(){
    return(
    <View style={styles.container}>
      <Text style={{color:"white",fontSize:30}}>Chat with other players on this screen</Text>
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
