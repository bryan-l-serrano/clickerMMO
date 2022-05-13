import React, { Component, } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {io} from 'socket.io-client';


class Profile extends Component{
    

    render(){
        return(
            <View>
                <Text>PROFILE PAGE</Text>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10
    }
  });
  
  
  export default Profile;