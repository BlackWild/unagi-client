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
  ScrollView
} from 'react-native';
import {styles} from '../styles/LogInStyles';

export default class LogIn extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar backgroundColor='#689F38' barStyle="light-content"/>
        <View style= {styles.headerBox}>           
          <Text style={{fontSize:30,color:'#FFFFFF',textAlign:'left',fontFamily: 'Vazir',}}>اوناگی</Text>
        </View>  
        <ScrollView>
        <View style={{flex: 1,flexDirection: 'column',justifyContent:'center',alignItems:'center',alignContent:'center'}}>
          <View style={styles.textIn}>
            <Text>ایمیل:</Text>
            <TextInput underlineColorAndroid="transparent" placeholder="ایمیل"style={styles.textarea}/>
          </View>
          <View style={styles.textIn}>
            <Text>رمز عبور:</Text>
            <TextInput underlineColorAndroid="transparent" placeholder="رمز عبور" style={styles.textarea}/>
          </View>
          <TouchableWithoutFeedback>
            <View style={styles.button}>
              <Text style={styles.buttonText} >ورود به حساب کاربری</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.button}>
              <Text style={styles.buttonText} > حساب کاربری ندارم </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>  
        </ScrollView>
      </View> 
    );
  }
}