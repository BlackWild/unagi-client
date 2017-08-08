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
// import {styles} from '../styles/SignUpStyles';
import {styles} from '../styles/formStyles';
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
      passDisply:true,
      rePassDisply:true,
      accept:false,
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
  showPass = () => {
    this.setState({passDisply:false,});
  }
  hidePass = () => {
    this.setState({passDisply:true,});
  }
  showRePass = () => {
    this.setState({rePassDisply:false,});
  }
  hideRePass = () => {
    this.setState({rePassDisply:true,});
  }
  acceptLow=()=>{
    if(! this.state.accept)
      this.setState({accept:true},);
    else this.setState({accept:false},);
  }
  
  render() {
    return (
      <View style={{flex:1,}}>
        <StatusBar backgroundColor='#689F38' barStyle="light-content"/>
        <View style= {styles.headerBox}>
          <Text style={{fontSize:30,color:'#FFFFFF',textAlign:'left',fontFamily: 'Vazir',marginLeft:13}}>اوناگی</Text>
        </View>
        {/* <View/> */}
        <ScrollView style={{alignContent:'center'}}>
        <View style={{flex: 1,flexDirection: 'column',justifyContent:'center',alignItems:'center',alignContent:'center'}}>
          <View>
            <Image source={require('../img/logo.png')} style={styles.picUp}/>  
          </View>  
          <View style={styles.textIn}>
<<<<<<< HEAD
            <Text style={styles.fieldName} >نام کاربری:</Text>
            <View style={styles.textAreaView}>
              <TextInput underlineColorAndroid="transparent" 
                placeholder="Username"
                style={styles.textarea} 
                onChangeText={(username) => this.setState({username})}/>
            </View>
          </View>
          <View style={styles.textIn}>
            <Text style={styles.fieldName} >رمز عبور:</Text>
            <View style={styles.textAreaView}>
              <TextInput secureTextEntry={this.state.passDisply} underlineColorAndroid="transparent" 
                placeholder="Password" style={styles.textarea} 
                onChangeText={(password) => this.setState({password})}/>
              <TouchableWithoutFeedback 
                onPressIn={this.showPass} onPressOut={this.hidePass}>
                <Image source={require('../img/eye.png')} 
                  style={{height:25,width:25,marginHorizontal:5}}
                />  
              </TouchableWithoutFeedback>  
            </View>
          </View>
          <View style={styles.textIn}>
            <Text style={styles.fieldName} >تکرار رمز عبور:</Text>
            <View style={styles.textAreaView}>
              <TextInput secureTextEntry={this.state.rePassDisply} underlineColorAndroid="transparent" placeholder="ReType Password"style={styles.textarea}  onChangeText={(repassword) => this.setState({repassword})}/>
              <TouchableWithoutFeedback onPressIn={this.showRePass} onPressOut={this.hideRePass}>
                  <Image source={require('../img/eye.png')} style={{height:25,width:25,marginHorizontal:5}}/>  
              </TouchableWithoutFeedback>
            </View>
=======
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
>>>>>>> 7766a714051b2f5214e955fb73f540d9f90e1a2a
          </View>
          <View style={{flexDirection:'row',height:30,margin:5,alignItems:'center'}}>
            <Text style={{fontFamily: 'Vazir',}}>قوانین تیم5 را می پذیرم.</Text>
            <TouchableWithoutFeedback onPress={this.acceptLow} >
              <View style={this.state.accept
                      ?[styles.checkBox,{backgroundColor:'#757575'}] 
                      :styles.checkBox}  
              />
            </TouchableWithoutFeedback>
          </View>
          <TouchableWithoutFeedback onPress={this.clickedtime}>
            <View style={[styles.button,{marginBottom:5,marginTop:5}]}>
              <Text style={[styles.buttonText,{textAlign:'center',fontFamily: 'Vazir'}]} >ساخت حساب کاربری</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        </ScrollView>
        {/* <View/> */}
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
