import React, { Component } from "react";
import { Text, View, TouchableWithoutFeedback, Image } from "react-native";

import { headerStyles } from "../styles/HeaderStyles";
import { styles } from "../styles/UserScreenStyles";
import { connect } from "react-redux";
import actions from "../reducers/Actions";
import { addBackHandler } from "../functions/BackHandlerAdder";

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
        <View style={styles.bar}>
          <View style={styles.header}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableWithoutFeedback onPress={this.backTouchHandler}>
                <Image source={require("../img/back.png")} style={styles.pic} />
              </TouchableWithoutFeedback>
              <Text style={styles.post}> حساب کاربری</Text>
            </View>
          </View>
        </View>

        <View style={styles.userBox}>
          <View style={styles.photo} />
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
    app: state.app
  };
};

export default connect(mapStateToProps)(UserPage);
