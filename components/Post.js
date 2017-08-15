import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableNativeFeedback
} from "react-native";
import { styles } from "../styles/PostStyles";
import { SERVER_DOMIN } from "../configs/config";

import { likePost, unlikePost } from "../functions/LikeFunctions";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Entypo";
import actions from "../reducers/Actions";
import { getPicture } from "../functions/profileFunction";

class Post extends Component {
  constructor(props) {
    super(props);
    this.lock = false;
    this.likeLock = false;
  }

  thisPost = () => ({
    _id: this.props.postID,
    content: this.props.content,
    likes: this.props.likes,
    isLiked: this.props.isLiked,
    username: this.props.username,
    date: this.props.date
  });

  likeHandler = () => {
    if (this.likeLock) {
      return null;
    } else {
      this.likeLock = true;
      likePost(this.props.accessToken, this.props.postID, this)
        .then(() => {
          this.likeLock = false;
        })
        .catch(() => {
          this.likeLock = false;
        });
    }
  };

  unlikeHandler = () => {
    if (this.likeLock) {
      return null;
    } else {
      this.likeLock = true;
      unlikePost(this.props.accessToken, this.props.postID, this)
        .then(() => {
          this.likeLock = false;
        })
        .catch(() => {
          this.likeLock = false;
        });
    }
  };

  replyHandler = () => {
    if (this.lock) {
      return null;
    } else {
      this.lock = true;
      this.props.dispatch({
        type: actions.SET_PARENT_POST,
        parentPost: this.thisPost()
      });
      this.props.dispatch({
        type: actions.SET_PAGE_NAME,
        pageName: "SendReplyScreen"
      });
      this.props.navigation.navigate("SendReplyScreen");
    }
  };
  postTouchHandler = () => {
    if (this.lock) {
      return null;
    } else {
      this.lock = true;
      this.props.dispatch({
        type: actions.SET_PARENT_POST,
        parentPost: this.thisPost()
      });
      this.props.dispatch({
        type: actions.SET_PAGE_NAME,
        pageName: "PostScreen"
      });
      this.props.navigation.navigate("PostScreen");
    }
  };

  render() {
    var date = new Date(this.props.date);
    var d = new Date() - date;
    var seconds = Math.floor(d / 1000);
    var timeago = "";
    if (Math.round(seconds / (60 * 60 * 24 * 365.25)) >= 2)
      timeago = Math.round(seconds / (60 * 60 * 24 * 365.25)) + " سال پیش";
    else if (Math.round(seconds / (60 * 60 * 24 * 365.25)) >= 1)
      timeago = " سال پیش";
    else if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 2)
      timeago = Math.round(seconds / (60 * 60 * 24 * 30.4)) + " ماه قیل";
    else if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 1)
      timeago = " ماه پیش";
    else if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 2)
      timeago = Math.round(seconds / (60 * 60 * 24 * 7)) + " هفته پیش";
    else if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 1)
      timeago = " هفته پیش";
    else if (Math.round(seconds / (60 * 60 * 24)) >= 2)
      timeago = Math.round(seconds / (60 * 60 * 24)) + " روز پیش";
    else if (Math.round(seconds / (60 * 60 * 24)) >= 1) timeago = " روز پیش";
    else if (Math.round(seconds / (60 * 60)) >= 2)
      timeago = Math.round(seconds / (60 * 60)) + " ساعت پیش";
    else if (Math.round(seconds / (60 * 60)) >= 1) timeago = "1 ساعت پیش";
    else if (Math.round(seconds / 60) >= 2)
      timeago = Math.round(seconds / 60) + " دقیقه پیش";
    else if (Math.round(seconds / 60) >= 1) timeago = "دقیقه پیش";
    else timeago = " همین الان";
    return (
      <TouchableNativeFeedback
        onPress={this.postTouchHandler}
        background={TouchableNativeFeedback.Ripple("#b388ff", false)}
      >
        <View style={styles.postBox}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
          >
            <View style={{ marginRight: 10, width: 300 }}>
              <Text style={styles.user}>
                {" "}{this.props.username ? this.props.username : "کاربر مهمان"}
              </Text>
              <Text style={styles.paragraph}>
                {this.props.content}
              </Text>
            </View>
            <View
              style={{
                width: 35,
                justifyContent: "flex-start",
                alignItems: "center",
                alignContent: "center"
              }}
            >
              <View
                style={{
                  height: 40,
                  width: 35,
                  borderRadius: 20,
                  backgroundColor: "#0077c0"
                }}
              >
                <Image
                  source={{
                    uri:
                      SERVER_DOMIN +
                      "/" +
                      this.props.username.toLowerCase() +
                      ".jpeg"
                  }}
                  style={{
                    height: 40,
                    width: 35,
                    borderRadius: 20
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{ color: "#9e9e9e", fontSize: 10, fontFamily: "Vazir" }}
              >
                {timeago}
              </Text>
              <Icon
                name="clock"
                color="#9e9e9e"
                size={10}
                style={{ marginLeft: 5 }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignContent: "center",
                alignItems: "center"
              }}
            >
              <View>
                <TouchableWithoutFeedback onPress={this.replyHandler}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Vazir",
                        color: "#757575"
                      }}
                    >
                      {this.props.replies}
                    </Text>
                    <Icon
                      name="reply"
                      color="#757575"
                      size={25}
                      style={{ marginLeft: 10 }}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={{ marginLeft: 20 }}>
                <TouchableWithoutFeedback
                  onPress={
                    this.props.isLiked ? this.unlikeHandler : this.likeHandler
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ fontFamily: "Vazir" }}>
                      {this.props.likes}
                    </Text>

                    <Icon
                      name="heart"
                      color={this.props.isLiked ? "#ff0000" : "#757575"}
                      size={25}
                      style={{ marginLeft: 10 }}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}
const mapStateToProps = state => {
  return {
    accessToken: state.userInfo.accessToken,
    refreshToken: state.userInfo.refreshToken
  };
};

export default connect(mapStateToProps)(Post);
