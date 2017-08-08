
import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import {} from '../functions/StateSetters';

import { styles } from '../styles/ReplayScreenStyles';
import { headerStyles } from '../styles/HeaderStyles';

import { connect } from 'react-redux';
import actions from '../reducers/Actions'
import {addBackHandler} from '../functions/BackHandlerAdder';


class ReplayScreen extends Component {
  constructor(props) {
    super(props);
    addBackHandler(this);

  }

  componentWillMount() {
    
  }

  static navigationOptions = ({ navigation }) => {

    return {
      header: (null),
    }
  };

  backTouchHandler = () => {
    console.log("back clicked -->   " ,this.props.pageName);
    this.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "PostScreen"});
    this.props.navigation.navigate("PostScreen");
  }

  render() {
    return (

        <TouchableWithoutFeedback onPress={this.backTouchHandler}>
          <View style={{ flex: 1 }}>
            
            
            <Text>
              ReplaySCREEEN
            </Text>

          </View>
        </TouchableWithoutFeedback>
    );

  }

}


const mapStateToProps = (state) => {
  return {
    accessToken: state.userInfo.accessToken,
    location: state.location,
    pageName: state.pageName,
    refreshToken: state.userInfo.refreshToken,
  }
};

export default connect(mapStateToProps)(ReplayScreen);