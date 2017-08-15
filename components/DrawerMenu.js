import React, { Component } from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import { styles } from "../styles/DrawerMenuStyles";
import Icon from "react-native-vector-icons/Entypo";
import { connect } from "react-redux";
import actions from "../reducers/Actions";
import { addBackHandler } from "../functions/BackHandlerAdder";

class DrawerMenu extends Component {
  navig = pageName => {
    if (this.props.app.drawerTouchLock) {
      return null;
    } else {
      this.props.app.drawerTouchLock = true;
      this.props.navigation.navigate(pageName);
      this.props.dispatch({ type: actions.SET_PAGE_NAME, pageName: pageName });
      this.props.app.lockDrawer();
    }
  };
  logout = () => {
    this.props.dispatch({
      type: actions.SET_INFO,
      username: "",
      password: "",
      accessToken: "",
      refreshToken: ""
    });
    this.navig("LogIn");
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.userBox}>
          <View style={styles.photo} />
          <Text style={styles.username}>
            {this.props.username}
          </Text>
        </View>
        <View>
          <TouchableWithoutFeedback onPress={() => this.navig("UserPage")}>
            <View style={styles.buttonView}>
              <Text style={styles.button}>حساب کاربری</Text>
              <Icon
                name="user"
                size={16}
                color="#689F38"
                style={{ margin: 5, marginLeft: 15 }}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.navig("AboutUsPage")}>
            <View style={styles.buttonView}>
              <Text style={styles.button}>درباره ما</Text>
              <Icon
                name="help"
                size={16}
                color="#689F38"
                style={{ margin: 5, marginLeft: 15 }}
              />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => this.logout()}>
            <View style={styles.buttonView}>
              <Text style={styles.button}>خروج</Text>
              <Icon
                name="log-out"
                size={16}
                color="#689F38"
                style={{ margin: 5, marginLeft: 15 }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    app: state.app,
    navigation: state.navigation,
    username: state.userInfo.username
  };
};

export default connect(mapStateToProps)(DrawerMenu);
