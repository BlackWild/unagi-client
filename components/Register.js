import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  StatusBar,
  TouchableWithoutFeedback
} from 'react-native';

export default class Register extends Component {
  
  constructor(props) {
    super(props);
  }
 

  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar backgroundColor='#689F38' barStyle="light-content"/>
        <View style= {styles.headerBox}>           
          <Text style={{fontSize:30,color:'#FFFFFF',textAlign:'left'}}>اوناگی</Text>
        </View>  
        <View style={{flex: 1,flexDirection: 'column',justifyContent:'center',alignItems:'center',alignContent:'center'}}>
          <Image source={require('./img/logo.png')} style={styles.pic}/>  
          <TouchableWithoutFeedback>
            <View style={styles.button}>
              <Text style={styles.buttonText}>ورود</Text>  
            </View>
          </TouchableWithoutFeedback>
          <View style={{height:10}}>
          </View>
          <TouchableWithoutFeedback>
            <View style={styles.button}>
              <Text style={styles.buttonText} >ساخت حساب کاربری</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>  
      </View> 
      
      
    );
  }
}
const styles = StyleSheet.create({
  buttonText:{
    color:'#FFFFFF',
    fontSize:20,
  },
  button:{
    backgroundColor:'#8BC34A',
    padding:10,
    width:200,
    borderRadius:8,
  },
    headerBox: {
    height:70,
    backgroundColor: '#8BC34A',
    justifyContent: 'center',
    alignItems:'flex-start',
  },
  pic:{
    width: 150, height: 150,
    margin:10,
    marginBottom:30,
  },

});