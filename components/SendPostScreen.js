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


const styles = StyleSheet.create({
  pic:{
    width: 30, height: 30,
    margin:10
  },
  bar:{
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#8BC34A',
  },
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#F1F1F1',

  },
  post: {
    fontSize: 20,
    color:'#F1F1F1',
    textAlign: 'center',
    justifyContent:'center',
    margin: 10,
  },
  charRemain: {
    fontSize: 20,
    color:'#F1F1F1',
    textAlign: 'center',
    justifyContent:'center',
    margin: 10,
  },
  textarea: {
    flex:1,
    width:350,
    color: '#000000',
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'auto',
    textAlignVertical: 'top'    
  }
});

AppRegistry.registerComponent('test', () => test);
