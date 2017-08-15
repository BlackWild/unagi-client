import React, { Component } from "react";
// const CachedImage = require("react-native-cached-image");
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  ToastAndroid
} from "react-native";

import { headerStyles } from "../styles/HeaderStyles";
import { styles } from "../styles/UserScreenStyles";
import { connect } from "react-redux";
import actions from "../reducers/Actions";
import { addBackHandler } from "../functions/BackHandlerAdder";
import ImagePicker from "react-native-image-picker";
import { sendPicture, getPicture } from "../functions/profileFunction";
import Icon from "react-native-vector-icons/Entypo";
class UserPage extends Component {
  constructor(props) {
    super(props);
    addBackHandler(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  openAvatarWindow = () => {
    var options = {
      title: "Select Avatar",
      customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
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
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={headerStyles.pagesHeader}>
          <TouchableWithoutFeedback onPress={this.backTouchHandler}>
            <Icon
              name="chevron-left"
              size={40}
              color="#f1f1f1"
              style={{ padding: 10 }}
            />
          </TouchableWithoutFeedback>
          <Text style={headerStyles.titleHeader}> حساب کاربری</Text>
        </View>

        <View style={styles.userBox}>
          <TouchableWithoutFeedback onPress={this.openAvatarWindow}>
            <View style={styles.photo}>
              {/* <CacheImage
                resizeMode="stretch"
                defaultSource={app.img.tabnav_list}
                url={this.props.url}
                style={{
                  width: 200,
                  height: 200
                }}
              /> */}
            </View>
          </TouchableWithoutFeedback>
          <View>
            <Text style={styles.username}>
              {this.props.username}
            </Text>
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
                bottom: 45
              }}
            >
              <Icon name="camera" size={24} color="#f1f1f1" />
            </View>
          </View>
        </View>
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
    url: state.userInfo.imageUri
  };
};

export default connect(mapStateToProps)(UserPage);
