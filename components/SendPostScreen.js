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

export default class test extends Component {
  
  constructor(props) {
    super(props);
    this.state = {text: '',textLenght:0};
  }

  render() {
    this.state.textLenght=this.state.text.split('').length;
    var overChar = {};
    if(this.state.textLenght>160){
      overChar = {
        color: '#ff0000' 
      } 
    }
    
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#689F38' barStyle="light-content"/>
        <View style={styles.bar}>
          <View style={{flex: 1, flexDirection: 'row'}}>
          <Image source={require('./img/back.png')} style={styles.pic}/>  
          <Text style={styles.post}>
            افزودن پست
          </Text>
          </View>
          <Text style={[styles.charRemain, overChar]}>
            {160-this.state.textLenght}
          </Text>
          <Image source={require('./img/send1.png')} style={styles.pic}/>  
        </View>
        <View style={{flex:1}}>
        <TextInput style={styles.textarea} underlineColorAndroid="transparent" multiline={true} 
          placeholder="بنویسید" 
          onChangeText={(text) => this.setState({text})}
        />
        
        </View>
      </View>
      
    );
  }
}

AppRegistry.registerComponent('test', () => test);
