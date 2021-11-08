import React, {Component} from 'react';
import { StyleSheet, View, Text, FlatList} from 'react-native';

export default class ChatScreen extends Component {
  render(){
    return(
    <View style={styles.container}>
        <FlatList
          data={[   ///fill in data here with matches
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  item:{
    color: 'white',
    fontSize: 40,
    paddingTop: "5%"
  }
});
