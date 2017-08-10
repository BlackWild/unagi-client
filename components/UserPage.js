
import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import { headerStyles } from '../styles/HeaderStyles';

import { connect } from 'react-redux';
import actions from '../reducers/Actions'
import {addBackHandler} from '../functions/BackHandlerAdder';

class UserPage extends Component {
  constructor(props) {
    super(props);
    addBackHandler(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        null
      )
    };
  };
  render() {
    return (
      <View>
        <Text>asndkashdhasdbasldbl</Text>
      </View>
    );

  }

}


const mapStateToProps = (state) => {
  return {
    pageName: state.pageName,
  }
};

export default connect(mapStateToProps)(UserPage);