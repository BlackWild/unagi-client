
import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import {} from '../functions/StateSetters';

import { styles } from '../styles/PostScreenStyles';
import { headerStyles } from '../styles/HeaderStyles';

import { connect } from 'react-redux';
import actions from '../reducers/Actions'
import {addBackHandler} from '../functions/BackHandlerAdder';


class PostScreen extends Component {
  constructor(props) {
    super(props);
    addBackHandler(this);

  }

  componentWillMount() {
    
  }

  static navigationOptions = ({ navigation }) => {

    return {
      header: (
        null
      ),
    }
  };

  backTouchHandler = () => {
    this.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "Home"});
    this.props.navigation.navigate("Home");
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.backTouchHandler}>
          <View style={{ flex: 1 }}>
            
            
            <Text>
              PostSCREEEN
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
    parentPost: state.replyContent.parentPost,
    replyPosts: state.replyContent.replyPosts
  }
};

export default connect(mapStateToProps)(PostScreen);