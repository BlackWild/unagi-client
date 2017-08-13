import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Image
} from "react-native";

import { styles } from "../styles/PostScreenStyles";
import { headerStyles } from "../styles/HeaderStyles";

import { connect } from "react-redux";
import actions from "../reducers/Actions";
import { addBackHandler } from "../functions/BackHandlerAdder";
import PostWithoutReplay from "./PostWithoutReplay";
import { sendParentGetReplies } from "../functions/replyFunctions";
import ActionButton from "react-native-action-button";

import { likePost, unlikePost } from "../functions/LikeFunctions";

import Icon from "react-native-vector-icons/Entypo";

class PostScreen extends Component {
  constructor(props) {
    super(props);
    addBackHandler(this);

    this.state = {
      refreshing: false
    };
  }

  componentWillMount() {
    this.props.dispatch({
      type: actions.SET_PAGE_NAME,
      pageName: "PostScreen"
    });
  }
  componentDidMount() {
    sendParentGetReplies(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  onPre = () => {
    this.props.dispatch({
      type: actions.SET_PAGE_NAME,
      pageName: "SendReplyScreen"
    });
    this.props.navigation.navigate("SendReplyScreen");
  };
  backTouchHandler = () => {
    this.props.dispatch({ type: actions.SET_PAGE_NAME, pageName: "Home" });
    this.props.navigation.navigate("Home");
  };
  parentLikeHandler = () => {
    likePost(this.props.accessToken, this.props.parentPost._id, this).then(() =>
      console.log("POST LIKED")
    );
  };

  parentUnlikeHandler = () => {
    unlikePost(
      this.props.accessToken,
      this.props.parentPost._id,
      this
    ).then(() => console.log("POST UNLIKED"));
  };
  onEndHandler = () => {
    if (this.state.hasNext) {
      getMoreReplyPost(that, this.state.nextStr);
    }
  };
  onRefreshHandler = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        sendParentGetReplies(this)
          .then(() => {
            this.setState({
              refreshing: false
            });
          })
          .catch(() => {});
      }
    );
  };

  render() {
    var date = new Date(this.props.parentPost.date);
    var monthNames = [
      "ژانویه ",
      "فوریه ",
      "مارس ",
      "آپریل ",
      "می ",
      "ژوئن ",
      "جولای ",
      "آگوست ",
      "سپتامبر ",
      "اکتبر ",
      "نوامبر ",
      "دسامبر "
    ];
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.bar}>
          <View style={styles.header}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableWithoutFeedback onPress={this.backTouchHandler}>
                <Image source={require("../img/back.png")} style={styles.pic} />
              </TouchableWithoutFeedback>
              <Text style={styles.post}> پست</Text>
            </View>
            <TouchableWithoutFeedback
              onPress={() => this.props.app.openDrawer()}
            >
              <Icon
                name="menu"
                size={50}
                color="#ffffff"
                style={{ margin: 10 }}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View
          style={{
            padding: 10,
            margin: 10,
            borderBottomWidth: 2,
            borderColor: "#757575"
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
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                alignContent: "center",
                alignItems: "center"
              }}
            >
              <View>
                <Text style={{ color: "#212121", margin: 15, width: 200 }}>
                  {this.props.parentPost.content}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "column",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center"
              }}
            >
              <View
                style={{
                  height: 80,
                  width: 70,
                  borderRadius: 40,
                  backgroundColor: "#689F38"
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  alignContent: "flex-end"
                }}
              >
                <Text
                  style={{
                    color: "#689F38",
                    margin: 0,
                    fontSize: 18,
                    textAlign: "right"
                  }}
                >
                  {this.props.parentPost.username}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <View>
              <Text
                style={{
                  color: "#757575",
                  margin: 15,
                  fontSize: 14,
                  fontFamily: "Vazir"
                }}
              >
                {date.getUTCDate()}
                {"  "}
                {monthNames[date.getMonth()]}
                {"  "}
                {date.getHours()}:{date.getMinutes()}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "flex-end",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Text>
                {this.props.parentPost.likes} پسند{" "}
              </Text>
              <TouchableWithoutFeedback
                onPress={
                  this.props.parentPost.isLiked
                    ? this.parentUnlikeHandler
                    : this.parentLikeHandler
                }
              >
                <Image
                  source={
                    this.props.parentPost.isLiked
                      ? require("../img/heartLike.png")
                      : require("../img/heartUnLike.png")
                  }
                  style={{ height: 20, width: 22, margin: 5 }}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>

        <View style={{ borderBottomColor: "#cccccc", borderBottomWidth: 0 }}>
          <Text
            style={{
              fontFamily: "Vazir",
              fontSize: 18,
              margin: 5,
              marginRight: 20
            }}
          >
            پاسخ ها:
          </Text>
        </View>

        {!this.props.replyPosts || this.props.replyPosts == []
          ? <View style={{ flex: 1, justifyContent: "center" }} />
          : <FlatList
              data={this.props.replyPosts}
              keyExtractor={(item, index) => item._id}
              renderItem={({ item }) =>
                <PostWithoutReplay
                  likes={item.likes}
                  isLiked={item.isLiked}
                  content={item.content}
                  date={item.date}
                  postID={item._id}
                  username={item.username}
                  navigation={this.props.navigation}
                />}
              onEndReached={this.onEndHandler}
              onEndReachedThreshold={1}
              refreshing={this.state.refreshing}
              onRefresh={this.onRefreshHandler}
            />}
        <ActionButton
          onPress={this.onPre}
          degrees={0}
          offsetX={10}
          offsetY={20}
          buttonColor="#858585"
          fixNativeFeedbackRadius={true}
          hideShadow={true}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.userInfo.accessToken,
    location: state.location,
    pageName: state.pageName.current,
    pageNameNotFromDrawer: state.pageName.currentNotFromDrawer,
    refreshToken: state.userInfo.refreshToken,
    parentPost: state.replyContent.parentPost,
    replyPosts: state.replyContent.replyPosts,
    app: state.app
  };
};

export default connect(mapStateToProps)(PostScreen);
