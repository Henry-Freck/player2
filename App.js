import React, {Component} from 'react';
import { StyleSheet, View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MatchScreen from './components/matchScreen';
import { NavigationContainer } from '@react-navigation/native';
import ChatScreen from './components/chatScreen';
import ProfileScreen from './components/profileScreen';
import { Ionicons } from '@expo/vector-icons'


const TabNavigator = createBottomTabNavigator();     //creating the bottom tab navigator

export default class App extends Component {

  render(){

    return(

    <NavigationContainer>
      <TabNavigator.Navigator screenOptions = {({route})=>({       //setting screen options for tab bar navigator

        tabBarIcon: ({size, color, focused})=>{

          let iconName

          if (route.name === "Match"){                            //returning correct ionicon for each page
            iconName = "people-circle-outline"
          }else if (route.name === "Chat"){
            iconName = "chatbubbles-outline"
          }else if (route.name === "Profile"){
            iconName = "person-circle-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />           //adding icons  to navbar

        },
        tabBarActiveTintColor: "chartreuse", 
        tabBarStyle: {
          backgroundColor: "black"                                              //other navbar settings
        }
      })}
      initialRouteName = "Match">
        <TabNavigator.Screen name="Match" component={MatchScreen}/>
        <TabNavigator.Screen name="Chat" component={ChatScreen}/>
        <TabNavigator.Screen name="Profile" component={ProfileScreen}/>
      </TabNavigator.Navigator>
    </NavigationContainer> 
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
