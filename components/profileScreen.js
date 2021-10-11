import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons'

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
      selectedItems: [],
    }
  }

  onGameSelectorItemsChange = (selectedItems) => {
    this.setState({selectedItems})
    //TODO: make this function push new selected items to firebase
  }

  render(){
    return(
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.fieldHeaders}>Display Name</Text>
        <TextInput 
          //TODO: make the text input field take up the width of the screen, not sure why that isn't working
          style={styles.textField}
          onChangeText={text => this.onDisplayNameChange(text)}
          placeholder='Enter a name to be displayed to other users'
        />
        <Text style={styles.fieldHeaders}>Game Selector</Text>
        <SectionedMultiSelect
          items={gameListOptions}
          IconRenderer={Icon}
          uniqueKey='id'
          subKey='children'
          selectText="Select the games that you want to match for"
          showDropDowns={false}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onGameSelectorItemsChange}
          selectedItems={this.state.selectedItems}
          showChips={false}
        />
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
    borderWidth: 10,
    borderColor: "#f2f2f2",
    width: "100%",
//    justifyContent: 'flex-start',
    flexDirection: 'row',
//    alignItems: 'flex-start'
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
