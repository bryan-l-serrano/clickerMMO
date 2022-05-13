import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ClickerComp from './components/ClickerComp';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons'; 
import Profile from './components/Profile';
import Leaderboard from './components/Leaderboard';

  const Tab = createBottomTabNavigator();


  function MyTabs(){
    return(
      <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen name = "Home" component={ClickerComp} options={{
          tabBarLabel: "Home",
          tabBarIcon:({color,size}) =>(
            <MaterialCommunityIcons name="gesture-tap-button" size={24} color="black" />
          )
        }}/>
        <Tab.Screen name = "Profile" component={Profile} options={{
          tabBarLabel: "Profile",
          tabBarIcon:({color,size}) =>(
            <FontAwesome5 name="user-ninja" size={24} color="black" />
          )
        }}/>
        <Tab.Screen name = "Leaderboard" component={Leaderboard} options={{
          tabBarLabel: "Leaderboard",
          tabBarIcon:({color,size}) =>(
            <MaterialIcons name="leaderboard" size={24} color="black" />
          )
        }}/>
      </Tab.Navigator>



    )
  }

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs></MyTabs>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
