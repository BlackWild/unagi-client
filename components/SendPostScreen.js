
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

import async from 'async';

import { styles } from '../styles/SendPostScreenStyles';
import { HomeScreen } from './HomeScreen';
import { setIDState, setLocationState } from '../functions/StateSetters';
import { sendPost } from '../functions/SendPost';

import { NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';

class SendPostScreen extends Component {

  constructor(props) {
    super(props);

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

  render() {

    const { navigate } = this.props.navigation;
    const onPre = () => {
      console.log("back clicked -->   " ,this.props.pageName);
      this.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "Home"});
      this.props.navigation.goBack();
    };

    const sendPostToServer = () => {
      
      if (this.isSending || this.state.isSending || this.state.isLengthOverLimit) {
        return null;
      } else {
        
        this.isSending = true;
        this.setState({
          isSending: true
        }, () => {
          async.parallel([
            (callback) => {
              setLocationState(this).then(() => callback()).catch(() => { });
            }
          ], (err) => {
            sendPost(this.props.accessToken, this.props.location, this.state.text, this).then((res) => {
              if (res === "ok") {
                this.isSending = false;
                this.setState({
                  isSending: false
                }, () => {
                  onPre();
                });
              }
            }).catch(() => {
              this.isSending = false;
              this.setState({
                isSending: false
              }, () => {
                
              });
            });
          })

        });

      }
    };


    return (
      <View style={{ flex: 1 }}>

        <View style={styles.bar}>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableWithoutFeedback onPress={onPre}>
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
              <TouchableWithoutFeedback onPress={this.state.isSending?()=>{}:sendPostToServer}>
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
    username: state.userInfo.username,
    location: state.location,
    pageName: state.pageName,
  }
};

export default connect(mapStateToProps)(SendPostScreen);