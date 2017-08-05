
import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import async from 'async';

import { styles } from '../styles/LoadingScreenStyles';

import { connect } from 'react-redux';
import actions from '../reducers/Actions'
import {addBackHandler} from '../functions/BackHandlerAdder';

class LoadingScreen extends Component {

  constructor(props) {
    super(props);

    addBackHandler(this);

    this.state = {
      
    }

  }

  componentWillMount() {
    
    setTimeout(()=>{
      
      this.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "LogIn"});
      this.props.navigation.navigate('LogIn');
    }, 3000);

  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  };

  render() {

    const { navigate } = this.props.navigation;

    return (
      <Text>LOADING</Text>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pageName: state.pageName,
  }
};

export default connect(mapStateToProps)(LoadingScreen);
// export default connect()(LoadingScreen);