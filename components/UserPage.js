import React, { Component } from "react";
// const CachedImage = require("react-native-cached-image");
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  ToastAndroid,
  FlatList
} from "react-native";

import { headerStyles } from "../styles/HeaderStyles";
import { styles } from "../styles/UserScreenStyles";
import { connect } from "react-redux";
import actions from "../reducers/Actions";
import { addBackHandler } from "../functions/BackHandlerAdder";
import ImagePicker from "react-native-image-picker";
import { sendPicture, getPicture } from "../functions/profileFunction";
import { getMoreUserPosts, getUserPosts } from "../functions/profileFunction";
import Icon from "react-native-vector-icons/Entypo";
import PostWithoutReplay from "../components/PostWithoutReplay";
import { SERVER_DOMIN } from "../configs/config";

class UserPage extends Component {
  constructor(props) {
    super(props);
    addBackHandler(this);
    this.state = {
      refreshing: false
    };
  }
  componentDidMount() {
    getUserPosts(this.props.accessToken, this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  openAvatarWindow = () => {
    var options = {
      title: "Select Avatar",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.showImagePicker(options, response => {
      // console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };
        this.setState({
          avatarSource: source
        });
        var temp = response.type;
        var arr = temp.split("/");
        sendPicture(this, arr, response.data);
        console.log(this.props.url, "mehdiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
      }
    });
  };
  backTouchHandler = () => {
    this.props.app.unlockDrawer();
    this.props.navigation.goBack();
    this.props.dispatch({
      type: actions.SET_PAGE_NAME,
      pageName: this.props.pageNameNotFromDrawer
    });
  };

  onEndHandler = () => {
    if (this.state.hasNext) {
      getMoreUserPosts(this.props.accessToken, this, this.state.nextStr);
    }
  };
  onRefreshHandler = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        getUserPosts(this.props.accessToken, this)
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
    return (
      <View style={{ flex: 1 }}>
        <View style={headerStyles.pagesHeader}>
          <TouchableWithoutFeedback onPress={this.backTouchHandler}>
            <Icon
              name="chevron-left"
              size={30}
              color="#f1f1f1"
              style={{ padding: 10 }}
            />
          </TouchableWithoutFeedback>
          <Text style={headerStyles.titleHeader}> حساب کاربری</Text>
        </View>

        <View style={styles.userBox}>
          <View style={styles.photo}>
            <Image
              source={{
                uri:
                  SERVER_DOMIN +
                  "/" +
                  this.props.username.toLowerCase() +
                  ".jpeg"
              }}
              style={{
                height: 96,
                width: 84,
                borderRadius: 48
              }}
            />
          </View>
          <View>
            <Text style={styles.username}>
              {this.props.username}
            </Text>
            <TouchableWithoutFeedback onPress={this.openAvatarWindow}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  backgroundColor: "#b388ff",
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  left: 120,
                  bottom: 40
                }}
              >
                <Icon name="camera" size={24} color="#f1f1f1" />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <FlatList
          data={this.props.userPosts}
          keyExtractor={(item, index) => item._id}
          renderItem={({ item }) =>
            <PostWithoutReplay
              likes={item.likes}
              isLiked={item.isLiked}
              content={item.content}
              date={item.date}
              postID={item._id}
              username={item.username}
              posterID={item.userID}
              replies={item.replies}
              navigation={this.props.navigation}
            />}
          onEndReached={this.onEndHandler}
          onEndReachedThreshold={2}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefreshHandler}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.userInfo.username,
    pageName: state.pageName.current,
    pageNameNotFromDrawer: state.pageName.currentNotFromDrawer,
    app: state.app,
    accessToken: state.userInfo.accessToken,
    url: state.userInfo.imageUri,
    userPosts: state.userPosts
  };
};

export default connect(mapStateToProps)(UserPage);
