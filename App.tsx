import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage';



const generateId = () =>{
  let id = uuid.v4();
  let idString = id.toString();
  return idString;
}

const storeClicks =  async (userClicks:number) =>{
  try{
    AsyncStorage.setItem("@clicks", userClicks.toString());
  }
  catch(e){
    console.log("failed to store clicks");
  }
}

const storeId = async (id:string) =>{
  try{
    AsyncStorage.setItem("@id", id);
  }
  catch(e){
    console.log("failed to store id");
  }
}




export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
