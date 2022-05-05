import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
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
  
  const getClicks = async () =>{
    try{
      const userClicks = await AsyncStorage.getItem("@clicks");
      return userClicks != null ? parseInt(userClicks) : 0;
    }
    catch(e){
      console.log("failed to load clicks")
      return 0;
    }
  }
  
  const getId = async () =>{
    try{
      const id = await AsyncStorage.getItem("@id");
      return id != null ? id : "";
    }
    catch(e){
      console.log("failed to getId");
      return "";
    }
  }

type ClickerCompProps = {

};

type ClickerCompState = {
    globalClicks:number;
    uuid:string;
    clicks:number;
}

  class ClickerComp extends Component<ClickerCompProps, ClickerCompState>{
    constructor(props: ClickerCompProps){
        super(props);
        this.state = {
            globalClicks:0,
            uuid:"",
            clicks:0

        }
    };

    componentDidMount(){
        getId().then((userid) =>{
            if(userid){
                this.setState({uuid:userid})
            }
            else{
                let userid = generateId();
                storeId(userid);
                this.setState({uuid:userid});
            }
        });

        getClicks().then((userclicks) =>{
            this.setState({clicks:userclicks})
        })
    }


    render(){
        return(
            <View style={styles.container}>
                <Text>userid: {this.state.uuid}</Text>
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
  });


  export default ClickerComp;