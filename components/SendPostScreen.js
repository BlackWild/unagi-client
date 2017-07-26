
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  StatusBar
} from 'react-native';

import {styles} from '../styles/SendPostScreenStyles';

import { NavigationActions  } from 'react-navigation';

export class SendPostScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {text: '',textLenght:0};
  }


  static navigationOptions = ({ navigation }) => {
    const {state} = navigation;
    console.log(state);

    return {
      header: null,
    }
  };

  render() {

    const { navigate } = this.props.navigation;
    const onPre = () => {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home'})
        ]
      });
      navigation.dispatch(resetAction);
    }

    
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor='#689F38' barStyle="light-content"/>
        <View style={styles.bar}>
          <View style={{flex: 1, flexDirection: 'row'}}>
           <Image source={require('../img/back.png')} style={styles.pic}/>   
          <Text style={styles.post}>
            افزودن پست
          </Text>
          </View>
          <Text style={[styles.charRemain]}>
            {160-this.state.textLenght}
          </Text>
           <Image source={require('../img/send.png')} style={styles.pic}/>   
        </View>
        <View style={styles.container}>           
          <View style={{flex:1}}>            
             <TextInput               
             style={styles.textarea}               
             underlineColorAndroid="transparent"               
             multiline={true}               
             placeholder="بنویسید"               
             onChangeText={(text) => {                 
               leng = text.split('').length;                 
               this.setState({                   
                 text,                   
                 textLenght: leng,                   
                 isLengthOverLimit: leng > 160})
               ;}}/> 
          </View>         
        </View>       
      </View>
    );
  }
}

