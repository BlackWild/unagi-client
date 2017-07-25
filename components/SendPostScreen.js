/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  StatusBar
} from 'react-native';

import {styles} from '../styles/SendPostScreenStyles';

export class SendPostScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {text: '',textLenght:0};
  }

  render() {

    let textLenght = this.state.text.split('').length;
    var overChar = {};
    if(textLenght>160){
      overChar = {
        color: '#ff0000' 
      } 
    }
    
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* <View style={styles.bar}>
            <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={styles.post}>
              افزودن پست
            </Text>
            </View>
            <Text style={[styles.charRemain, overChar]}>
              {160-this.state.textLenght}
            </Text>
            <Image source={require('./img/send1.png')} style={styles.pic}/>   
          </View> */}
          <View style={{flex:1}}>
          <TextInput style={styles.textarea} underlineColorAndroid="transparent" multiline={true} 
            placeholder="بنویسید" 
            onChangeText={(text) => this.setState({text})}
          />
          
          </View>
        </View>
      </View>
      
    );
  }
}

// AppRegistry.registerComponent('test', () => test);
