import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableWithoutFeedback,
  BackHandler,
} from 'react-native';

import { styles } from '../styles/SendPostScreenStyles';
import { HomeScreen } from './HomeScreen';
import { setIDState, setLocationState } from '../functions/StateSetters';
import { replyPost, sendParentGetReplies } from '../functions/replyFunctions';
import { sendPost } from '../functions/SendPost';

import { NavigationActions } from 'react-navigation';
import { addBackHandler } from '../functions/BackHandlerAdder';

import { connect } from 'react-redux';

class SendReplyScreen extends Component {

  constructor(props) {
    super(props);
    addBackHandler(this);

    this.isSending = false;
    this.state = {
      textLenght: 0,
      isSending: false
    }

  }


  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  };

  sendReplyToServer = () => {

    if (this.isSending || this.state.isSending || this.state.isLengthOverLimit) {
      return null;
    } else {

      this.isSending = true;
      this.setState({
        isSending: true
      }, () => {
        setLocationState(this).then(() => {
          replyPost(this.state.text, this).then((res) => {
            if (res === "ok") {
              this.backTouchHandler();
            }
          }).catch(() => {
            this.setState({
              isSending: false
            }, () => {
              this.isSending = false;
            });
          });
        })

      });

    }
  };
  backTouchHandler = () => {
    console.log("back clicked -->   ", this.props.pageName);
    this.props.dispatch({ type: actions.SET_PAGE_NAME, pageName: "PostScreen" });
    this.props.navigation.navigate("PostScreen");
  };

  render() {

    return (
      <View style={{ flex: 1 }}>

        <View style={styles.bar}>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableWithoutFeedback onPress={this.backTouchHandler}>
                <Image source={require('../img/back.png')} style={styles.pic} />
              </TouchableWithoutFeedback>
              <Text style={styles.post}>
                افزودن پست
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={this.state.isLengthOverLimit ? [styles.charRemain, styles.overChar] : [styles.charRemain, { justifyContent: 'center', alignContent: 'center' }]}>
                {160 - this.state.textLenght}
              </Text>
              <TouchableWithoutFeedback onPress={this.state.isSending ? () => { } : this.sendReplyToServer}>
                <Image source={require('../img/send.png')} style={styles.pic} />
              </TouchableWithoutFeedback>
            </View>

          </View>

        </View>

        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.textarea}
              underlineColorAndroid="transparent"
              multiline={true}
              placeholder="اونجا که هستی چه خبره!؟"
              onChangeText={(text) => {
                leng = text.split('').length;
                this.setState({
                  text,
                  textLenght: leng,
                  isLengthOverLimit: leng > 160
                });
              }}
            />
          </View>
        </View>

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accessToken: state.userInfo.accessToken,
    refreshToken: state.userInfo.refreshToken,
    username: state.userInfo.username,
    location: state.location,
    pageName: state.pageName,
    parentPost: state.replyContent.parentPost,
  }
};

export default connect(mapStateToProps)(SendReplyScreen);