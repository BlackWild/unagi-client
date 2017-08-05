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
  ToastAndroid,
} from 'react-native';
import {styles} from '../styles/LogInStyles';

import { connect } from 'react-redux';
import actions from '../reducers/Actions';
import {logIn} from '../functions/StateSetters';

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
    try {

        if (this.state.userName === '' || this.state.password === '')
            throw "empty";
        logIn(this.state.userName, this.state.password,this).then((arg) => {
            // console.warn("hellow");

            if (!arg) {
                ToastAndroid.show('نام کاربری یا رمز عبور است', ToastAndroid.SHORT);
            }
            else {
                this.props.navigation.navigate('Home');

            }
        }).catch(() => {
        });
    }
    catch(err) {
        ToastAndroid.show('نام کاربری یا رمز عبور نمی تواند خالی باشد', ToastAndroid.SHORT);

    }
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
            <TextInput underlineColorAndroid="transparent" placeholder="ایمیل"style={styles.textarea} onChangeText={(userName) => this.setState({userName})}/>
          </View>
          <View style={styles.textIn}>
            <Text>رمز عبور:</Text>
            <TextInput underlineColorAndroid="transparent" placeholder="رمز عبور" style={styles.textarea} onChangeText={(password) => this.setState({password})}/>
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