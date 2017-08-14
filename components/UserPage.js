import React, { Component } from "react";
import { Text, View, TouchableWithoutFeedback, Image } from "react-native";

import { headerStyles } from "../styles/HeaderStyles";
import { styles } from "../styles/UserScreenStyles";
import { connect } from "react-redux";
import actions from "../reducers/Actions";
import { addBackHandler } from "../functions/BackHandlerAdder";
import ImagePicker from "react-native-image-picker";
import { sendPicture } from "../functions/profileFunction";
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
      console.log("Response = ", response);

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
            <Image
              source={require("../img/back.png")}
              style={headerStyles.backPic}
            />
          </TouchableWithoutFeedback>
          <Text style={headerStyles.titleHeader}> حساب کاربری</Text>
        </View>

        <View style={styles.userBox}>
          <TouchableWithoutFeedback onPress={this.openAvatarWindow}>
            <View style={styles.photo} />
          </TouchableWithoutFeedback>
          <Text style={styles.username}>
            {this.props.username}
          </Text>
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
    accessToken: state.userInfo.accessToken
  };
};

export default connect(mapStateToProps)(UserPage);
