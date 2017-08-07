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
import {styles} from '../styles/SignUpStyles';
import {sendUsernameId} from '../functions/StateSetters';
import { connect } from 'react-redux';
import actions from '../reducers/Actions';
import {addBackHandler} from '../functions/BackHandlerAdder';
class SignUp extends Component {
  
  constructor(props) {
    super(props);
    addBackHandler(this);
    this.state={
      username:'',
      password:'',
      repassword:'',
    }
  }

  clickedtime=()=>{
    if(this.state.password!==this.state.repassword) {
      ToastAndroid.show('رمز عبور تطابق ندارد', ToastAndroid.SHORT);
    } else {
      try {
            if (this.state.username === '' || this.state.password === '')
                throw "empty";
            sendUsernameId(this.state.username,this.state.password,this).then((arg)=>{
            if(!arg){
              ToastAndroid.show('نام کاربری تکراری است', ToastAndroid.SHORT);
            }
            else{
              this.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "Home"});
              this.props.navigation.navigate('Home');
            }

      });
      }
      catch (err){
          ToastAndroid.show('نام کاربری یا رمز عبور نمی تواند خالی باشد', ToastAndroid.SHORT);
      }

    }
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
            <Text>نام کاربری:</Text>
            <TextInput underlineColorAndroid="transparent" placeholder="نام کاربری"style={styles.textarea} onChangeText={(username) => this.setState({username})}/>
          </View>
          <View style={styles.textIn}>
            <Text>رمز عبور:</Text>
            <TextInput underlineColorAndroid="transparent" placeholder="رمز عبور" style={styles.textarea} secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
          </View>
          <View style={styles.textIn}>
            <Text >تکرار رمز عبور:</Text>
            <TextInput underlineColorAndroid="transparent" placeholder="تکرار رمز عبور"style={styles.textarea} secureTextEntry={true}  onChangeText={(repassword) => this.setState({repassword})}/>
          </View>
          <View style={[styles.textIn,{height:40}]}>
            <Text style={{fontFamily: 'Vazir',}}>قوانین تیم5 را می پذیرم.</Text>
          </View>
          <TouchableWithoutFeedback onPress={this.clickedtime}>
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
