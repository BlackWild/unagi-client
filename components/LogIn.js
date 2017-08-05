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
import {styles} from '../styles/LogInStyles';

import { connect } from 'react-redux';
import actions from '../reducers/Actions';
import {addBackHandler} from '../functions/BackHandlerAdder';

export class LogIn extends Component {
  
  constructor(props) {
    super(props);
    addBackHandler(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  };


  logInClickHandler = () => {
    this.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "Home"});
    this.props.navigation.navigate('Home');
  }
  signUpClickHandler = () => {
    this.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "SignUp"});
    this.props.navigation.navigate('SignUp');
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
          <TouchableWithoutFeedback onPress={this.logInClickHandler} >
            <View style={styles.button}>
              <Text style={styles.buttonText} >ورود به حساب کاربری</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.signUpClickHandler}>
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

const mapStateToProps = (state) => {
  return {
    pageName: state.pageName,
  }
};
export default connect(mapStateToProps)(LogIn);