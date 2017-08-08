
import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';

import async from 'async';

import { styles } from '../styles/LoadingScreenStyles';

import { connect } from 'react-redux';
import actions from '../reducers/Actions'
import {addBackHandler} from '../functions/BackHandlerAdder';

import {tokenProvider} from '../functions/StateSetters';

class LoadingScreen extends Component {

  constructor(props) {
    super(props);
    addBackHandler(this);
  }

  componentWillMount() {
    // this.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "LoadingScreen"});
    if(this.props.refreshToken) {
      tokenProvider(this).then(()=>{
        this.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "Home"});
        this.props.navigation.navigate('Home');
      }).catch(()=>{
        this.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "LogIn"});
        this.props.navigation.navigate('LogIn');
      });
    } else {
      this.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "LogIn"});
      this.props.navigation.navigate('LogIn');
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  };

  render() {

    return (
      <View style={{flex:1,backgroundColor:'#8BC34A'}}>
        <StatusBar backgroundColor='#689F38' barStyle="light-content"/>
        <View style={[styles.container]}>
          <Image source={require('../img/logo.png')} style={styles.pic}/>  
           <Text style={styles.welcome}> اوناگ کن! </Text> 
          <ActivityIndicator style={{transform: [{scale: 1.5}]}} size="large" color='#DCEDC8'/>
        </View>  
      </View>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    pageName: state.pageName,
    refreshToken: state.userInfo.refreshToken,
  }
};

export default connect(mapStateToProps)(LoadingScreen);