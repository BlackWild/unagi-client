
import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import async from 'async';

import { styles } from '../styles/LoadingScreenStyles';

import { connect } from 'react-redux';

import actions from '../reducers/Actions'

class LoadingScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    }

  }

  componentWillMount() {
    
    setTimeout(()=>{
      console.log(this.props.navigation);
      this.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "Home"});
      this.props.navigation.navigate('Home');
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

  }
};

export default connect(mapStateToProps)(LoadingScreen);
// export default connect()(LoadingScreen);