import React, { Component } from "react";
import { Text, View, Image, TouchableWithoutFeedback } from "react-native";
import { styles } from "../styles/PostStyles";
import Icon from "react-native-vector-icons/Entypo";
import { likePost, unlikePost } from "../functions/LikeFunctions";
import { connect } from "react-redux";

class PostWithoutReplay extends Component {
  constructor(props) {
    super(props);
  }

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
      <View style={[styles.postBox, { margin: 10, marginBottom: 0 }]}>
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
            justifyContent: "space-between",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center"
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
          <View style={[styles.likeBox, { justifyContent: "flex-end" }]}>
            <Text style={{ fontFamily: "Vazir" }}> پسند </Text>
            <Text>
              {this.props.likes}
            </Text>
            <TouchableWithoutFeedback
              onPress={
                this.props.isLiked ? this.unlikeHandler : this.likeHandler
              }
            >
              <Image
                source={
                  this.props.isLiked
                    ? require("../img/heartLike.png")
                    : require("../img/heartUnLike.png")
                }
                style={{ height: 20, width: 22, margin: 5 }}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.userInfo.accessToken,
    refreshToken: state.userInfo.refreshToken
  };
};

export default connect(mapStateToProps)(PostWithoutReplay);
