import React, { Component, } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {io} from 'socket.io-client';

const generateId = () => {
  let id = uuid.v4();
  let idString = id.toString();
  return idString;
}

const storeClicks = async (userClicks: number) => {
  try {
    AsyncStorage.setItem("@clicks", userClicks.toString());
  }
  catch (e) {
    console.log("failed to store clicks");
  }
}

const storeId = async (id: string) => {
  try {
    AsyncStorage.setItem("@id", id);
  }
  catch (e) {
    console.log("failed to store id");
  }
}

const getClicks = async () => {
  try {
    const userClicks = await AsyncStorage.getItem("@clicks");
    return userClicks != null ? parseInt(userClicks) : 0;
  }
  catch (e) {
    console.log("failed to load clicks")
    return 0;
  }
}

const getId = async () => {
  try {
    const id = await AsyncStorage.getItem("@id");
    return id != null ? id : "";
  }
  catch (e) {
    console.log("failed to getId");
    return "";
  }
}

type ClickerCompProps = {

};

type ClickerCompState = {
  globalClicks: number;
  uuid: string;
  clicks: number;
  rank: number;
}

class ClickerComp extends Component<ClickerCompProps, ClickerCompState>{
  constructor(props: ClickerCompProps) {
    super(props);
    this.state = {
      globalClicks: 0,
      uuid: "",
      clicks: 0,
      rank: 0
    }
  };

  componentDidMount() {
    const socket = io("http://127.0.0.1:6789", {transports:['websocket'],});
    socket.connect();
    socket.emit('click',this.state.uuid);
    // socket.on("updateClicks", (val: { globalClicks: any; rank: any; })=>{
    //   this.setState({globalClicks:val.globalClicks, rank:val.rank})
    // });
    // this.socket.on("globalClicks", (val: { globalClicks: any; })=>{
    //   this.setState({globalClicks:val.globalClicks});
    // });
    getId().then((userid) => {
      if (userid) {
        this.setState({ uuid: userid })
      }
      else {
        let userid = generateId();
        storeId(userid);
        this.setState({ uuid: userid });
      }
    });

    getClicks().then((userclicks) => {
      this.setState({ clicks: userclicks })
    })
  }

onSingleClick() {
  this.setState({clicks: this.state.clicks + 1});
  storeClicks(this.state.clicks);
  console.log('clicked: ' + this.state.uuid);
}


  render() {
    return (
      <View style={styles.container}>
        <Text>userid: {this.state.uuid}</Text>
        <Text>Global Count: {this.state.globalClicks}</Text>
        <Text>Rank: {this.state.rank}</Text>
        <Text>Local Count: {this.state.clicks}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={()=> this.onSingleClick()}
        >
          <Text>Press Here</Text>
        </TouchableOpacity>
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


export default ClickerComp;