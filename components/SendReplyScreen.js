import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableWithoutFeedback,
  BackHandler,
  ToastAndroid,
  TouchableOpacity
} from "react-native";

import { headerStyles } from "../styles/HeaderStyles";
import { styles } from "../styles/SendPostScreenStyles";
import { HomeScreen } from "./HomeScreen";
import { setIDState, setLocationState } from "../functions/StateSetters";
import { replyPost, sendParentGetReplies } from "../functions/replyFunctions";
import { sendPost } from "../functions/SendPost";
import Icon from "react-native-vector-icons/Entypo";
import { NavigationActions } from "react-navigation";
import { addBackHandler } from "../functions/BackHandlerAdder";

import { connect } from "react-redux";

class SendReplyScreen extends Component {
  constructor(props) {
    super(props);
    addBackHandler(this);

    this.lock = false;
    this.state = {
      textLenght: 0
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: actions.SET_PAGE_NAME,
      pageName: "SendReplyScreen"
    });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  sendReplyToServer = () => {
    if (this.lock || this.state.isLengthOverLimit) {
      return null;
    } else {
      this.lock = true;
      setLocationState(this)
        .then(() => {
          if (this.state.text)
            replyPost(this.state.text, this)
              .then(res => {
                this.lock = false;
                if (res === "ok") {
                  this.backTouchHandler();
                }
              })
              .catch(() => {
                this.lock = false;
              });
          else {
            this.lock = false;
            ToastAndroid.show("یه چیزی بنویس", ToastAndroid.SHORT);
          }
        })
        .catch(() => {
          this.lock = false;
        });
    }
  };
  backTouchHandler = () => {
    if (this.lock) {
      return null;
    } else {
      this.lock = true;
      this.props.dispatch({
        type: actions.SET_PAGE_NAME,
        pageName: "PostScreen"
      });
      this.props.navigation.navigate("PostScreen");
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={headerStyles.pagesHeader}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center"
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={this.backTouchHandler}>
                <Icon
                  name="chevron-left"
                  size={30}
                  color="#f1f1f1"
                  style={{ padding: 10 }}
                />
              </TouchableOpacity>
              <Text style={styles.post}>پاسخ پست</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={
                  this.state.isLengthOverLimit
                    ? [styles.charRemain, styles.overChar]
                    : [
                        styles.charRemain,
                        { justifyContent: "center", alignContent: "center" }
                      ]
                }
              >
                {160 - this.state.textLenght}
              </Text>
              <TouchableOpacity onPress={this.sendReplyToServer}>
                <Image source={require("../img/send.png")} style={styles.pic} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.textarea}
              underlineColorAndroid="transparent"
              multiline={true}
              placeholder="اوناگ کن! "
              onChangeText={text => {
                leng = text.split("").length;
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

const mapStateToProps = state => {
  return {
    accessToken: state.userInfo.accessToken,
    refreshToken: state.userInfo.refreshToken,
    username: state.userInfo.username,
    location: state.location,
    pageName: state.pageName.current,
    pageNameNotFromDrawer: state.pageName.currentNotFromDrawer,
    parentPost: state.replyContent.parentPost
  };
};

export default connect(mapStateToProps)(SendReplyScreen);
