import React, { Component } from "react";
import { Text, View, FlatList, TouchableWithoutFeedback } from "react-native";
import ActionButton from "react-native-action-button";
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType
} from "react-native-fcm";

import Post from "../components/Post";
import {
  setIDState,
  setLocationState,
  setPostState,
  getMorePost,
  tokenProvider,
  sendFcmToken
} from "../functions/StateSetters";

import { styles } from "../styles/HomeScreenStyles";
import { headerStyles } from "../styles/HeaderStyles";

import { connect } from "react-redux";
import actions from "../reducers/Actions";
import { addBackHandler } from "../functions/BackHandlerAdder";

import Icon from "react-native-vector-icons/Entypo";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    addBackHandler(this);

    this.state = {
      refreshing: false
    };
    this.lock = false;
  }

  componentWillMount() {
    this.props.dispatch({ type: actions.SET_PAGE_NAME, pageName: "Home" });
    this.props.app.unlockDrawer();
    FCM.requestPermissions(); // for iOS
    FCM.getFCMToken().then(fcmToken => {
      console.log("yoo", fcmToken);
      sendFcmToken(this, this.props.accessToken, fcmToken);
    });
    this.notificationListener = FCM.on(FCMEvent.Notification, async notif => {
      console.log("boo", notif);
      // FCM.presentLocalNotification({
      //   title: notif.title,                     // as FCM payload
      //   body: notif.body,                    // as FCM payload (required)
      //   sound: "default",                                   // as FCM payload
      //   priority: notif.priority,                                   // as FCM payload
      //   // click_action: "ACTION",                             // as FCM payload
      //   badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
      //   // number: 10,                                         // Android only

      //   large_icon: "ic_launcher",                           // Android only
      //   icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
      //   vibrate: 100,                                       // Android only default: 300, no vibration if you pass null
      //   lights: true,                                       // Android only, LED blinking (default false)
      //   // show_in_foreground: true                                  // notification when app is in foreground (local & remote)
      // });
    });
    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
      console.log("soo", token);
      FCM.getFCMToken().then(fcmToken => {
        console.log("yoo", fcmToken);
        sendFcmToken(this, this.props.accessToken, fcmToken);
      });
      // fcm token may not be available on first load, catch it here
    });
  }

  componentDidMount() {
    setLocationState(this).then(() => {
      setPostState(this.props.accessToken, this.props.location, this);
    });
  }

  componentWillUnmount() {
    // stop listening for events
    this.notificationListener.remove();
    this.refreshTokenListener.remove();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View style={headerStyles.headerBox}>
          <Text style={headerStyles.logo}>اوناگی</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.state.params.openDrawer()}
          >
            <Icon
              name="menu"
              size={30}
              color="#ffffff"
              style={{ margin: 10 }}
            />
          </TouchableWithoutFeedback>
        </View>
      )
    };
  };

  onPre = () => {
    if (this.lock) {
      return null;
    } else {
      this.lock = true;
      this.props.dispatch({
        type: actions.SET_PAGE_NAME,
        pageName: "SendPostScreen"
      });
      this.props.navigation.navigate("SendPostScreen", {
        onGoBack: () => {
          this.lock = false;
        }
      });
    }
  };

  onEndHandler = () => {
    if (this.state.hasNext) {
      getMorePost(
        this.props.accessToken,
        this.props.location,
        this,
        this.state.nextStr
      );
    }
  };
  onRefreshHandler = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        setPostState(this.props.accessToken, this.props.location, this)
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
    if (
      !this.props.navigation.state.params ||
      !this.props.navigation.state.params.openDrawer
    ) {
      this.props.navigation.setParams({
        openDrawer: this.props.app.openDrawer
      });
    }
    return (
      <View style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
        <View style={styles.container}>
          {!this.props || !this.props.posts
            ? <View style={{ flex: 1, justifyContent: "center" }}>
                <Text>LOADING</Text>
              </View>
            : <FlatList
                data={this.props.posts}
                keyExtractor={(item, index) => item._id}
                renderItem={({ item }) =>
                  <Post
                    likes={item.likes}
                    isLiked={item.isLiked}
                    content={item.content}
                    date={item.date}
                    postID={item._id}
                    username={item.username}
                    posterID={item.userID}
                    replies={item.replies}
                    navigation={this.props.navigation}
                    imageUri={item.imageUri ? item.imageUri : undefined}
                  />}
                onEndReached={this.onEndHandler}
                onEndReachedThreshold={2}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefreshHandler}
              />}

          <ActionButton
            onPress={this.onPre}
            degrees={0}
            offsetX={10}
            offsetY={20}
            buttonColor="#b388ff"
            fixNativeFeedbackRadius={true}
            hideShadow={true}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    accessToken: state.userInfo.accessToken,
    location: state.location,
    pageName: state.pageName.current,
    pageNameNotFromDrawer: state.pageName.currentNotFromDrawer,
    refreshToken: state.userInfo.refreshToken,
    app: state.app
  };
};

export default connect(mapStateToProps)(HomeScreen);
