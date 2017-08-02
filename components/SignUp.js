import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';

export default class SignUp extends Component {
  
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
          
          <View style={styles.textIn}>
            <Text>ایمیل:</Text>
            <TextInput underlineColorAndroid="transparent" placeholder="ایمیل"style={styles.textarea}/>
          </View>
          <View style={styles.textIn}>
            <Text>رمز عبور:</Text>
            <TextInput underlineColorAndroid="transparent" placeholder="رمز عبور" style={styles.textarea}/>
          </View>
          
          <View style={styles.textIn}>
            <Text>تکرار رمز عبور:</Text>
            <TextInput underlineColorAndroid="transparent" placeholder="تکرار رمز عبور"style={styles.textarea}/>
          </View>
          <View style={[styles.textIn,{height:40}]}>
            <Text style={{}}>قوانین تیم5 را می پذیرم.</Text>
          </View>
          <TouchableWithoutFeedback>
            <View style={styles.button}>
              <Text style={[styles.buttonText,{textAlign:'center'}]} >ساخت حساب کاربری</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>  
      </View> 
      
      
    );
  }
}


const styles = StyleSheet.create({
  textIn:{
    height:70,
    // padding:5,
    margin:5,
  },
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
  
  textarea: {
    padding:5,
    margin:5,
    flex:1,
    width:200,
    height:70,
    color: '#000000',
    justifyContent: 'center',
    textAlign: 'auto',
    textAlignVertical: 'center',
    borderWidth:1,
    borderColor:'#9e9e9e',
    borderRadius:3,
  },
fieldName:{
  padding:5,
  margin:5,
  textAlignVertical:'center'
}

});