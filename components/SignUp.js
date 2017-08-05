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
  ScrollView,
} from 'react-native';
import {styles} from '../styles/SignUpStyles';

import { connect } from 'react-redux';
import actions from '../reducers/Actions';
import {addBackHandler} from '../functions/BackHandlerAdder';

export class SignUp extends Component {
  
  constructor(props) {
    super(props);
    addBackHandler(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  };

  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar backgroundColor='#689F38' barStyle="light-content"/>
        <View style= {styles.headerBox}>           
          <Text style={{fontSize:30,color:'#FFFFFF',textAlign:'left',fontFamily: 'Vazir'}}>اوناگی</Text>
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
          <View style={styles.textIn}>
            <Text >تکرار رمز عبور:</Text>
            <TextInput underlineColorAndroid="transparent" placeholder="تکرار رمز عبور"style={styles.textarea}/>
          </View>
          <View style={[styles.textIn,{height:40}]}>
            <Text style={{fontFamily: 'Vazir',}}>قوانین تیم5 را می پذیرم.</Text>
          </View>
          <TouchableWithoutFeedback>
            <View style={styles.button}>
              <Text style={[styles.buttonText,{textAlign:'center',fontFamily: 'Vazir'}]} >ساخت حساب کاربری</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        </ScrollView>  
      </View> 
      
      
    );
  }
}


const mapStateToProps = (state) => {
  return {
    pageName: state.pageName,
  }
};
export default connect(mapStateToProps)(SignUp);