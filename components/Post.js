import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableNativeFeedback
} from "react-native";
import { styles } from "../styles/PostStyles";

import { likePost, unlikePost } from "../functions/LikeFunctions";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Entypo";
import actions from "../reducers/Actions";

class Post extends Component {
  constructor(props) {
    super(props);
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
    likePost(this.props.accessToken, this.props.postID, this).then(() =>
      console.log("POST LIKED")
    );
  };

  unlikeHandler = () => {
    unlikePost(this.props.accessToken, this.props.postID, this).then(() =>
      console.log("POST UNLIKED")
    );
  };
  replyHandler = () => {
    this.props.dispatch({
      type: actions.SET_PARENT_POST,
      parentPost: this.thisPost()
    });
    this.props.dispatch({
      type: actions.SET_PAGE_NAME,
      pageName: "SendReplyScreen"
    });
    this.props.navigation.navigate("SendReplyScreen");
  };
  postTouchHandler = () => {
    this.props.dispatch({
      type: actions.SET_PARENT_POST,
      parentPost: this.thisPost()
    });
    this.props.dispatch({
      type: actions.SET_PAGE_NAME,
      pageName: "PostScreen"
    });
    this.props.navigation.navigate("PostScreen");
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
        background={TouchableNativeFeedback.Ripple("green", false)}
      >
        <View style={styles.postBox}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignContent: "center"
            }}
          >
            <View style={styles.userBox}>
              <Text style={styles.user}>
                {" "}{this.props.username ? this.props.username : "کاربر مهمان"}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.paragraph}>
              {this.props.content}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10
              }}
            >
              <Text
                style={{ color: "#9E9E9E", fontSize: 14, fontFamily: "Vazir" }}
              >
                {timeago}
              </Text>
              <Icon
                name="clock"
                color="#9E9E9E"
                size={14}
                style={{ marginLeft: 5 }}
              />
            </View>
            <View style={styles.likeBox}>
              <TouchableWithoutFeedback onPress={this.replyHandler}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 10,
                    margin: 5
                  }}
                >
                  <Text style={{ fontFamily: "Vazir" }}>
                    {this.props.replies}
                  </Text>
                  <Icon name="reply" color="#757575" size={25} />
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={
                  this.props.isLiked ? this.unlikeHandler : this.likeHandler
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 10,
                    margin: 5
                  }}
                >
                  {/* <Text style={{ fontFamily: "Vazir" }}> 0</Text>  */}
                  <Text style={{ fontFamily: "Vazir" }}>
                    {this.props.likes}
                  </Text>

                  <Image
                    source={
                      this.props.isLiked
                        ? require("../img/heartLike.png")
                        : require("../img/heartUnLike.png")
                    }
                    style={{ height: 22, width: 24, margin: 5 }}
                  />
                </View>
              </TouchableWithoutFeedback>
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
