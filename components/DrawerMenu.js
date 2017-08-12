import React, { Component } from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import { styles } from "../styles/DrawerMenuStyles";

import { connect } from "react-redux";
import actions from "../reducers/Actions";

class DrawerMenu extends Component {
  navig = pageName => {
    this.props.dispatch({ type: actions.SET_PAGE_NAME, pageName: pageName });
    this.props.navigation.navigate(pageName);
    this.props.app.closeDrawer();
  };
  logout = () => {
    this.props.dispatch({
      type: actions.SET_INFO,
      username: "",
      password: "",
      accessToken: "",
      refreshToken: ""
    });
    this.props.app.lockDrawer();
    this.navig("LogIn");
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.userBox}>
          <View style={styles.photo} />
          <Text style={styles.username}>Username!</Text>
        </View>
        <View>
          <TouchableWithoutFeedback onPress={() => this.navig("UserPage")}>
            <View style={styles.buttonView}>
              <Text style={styles.button}>حساب کاربری</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.buttonView}>
              <Text style={styles.button}>درباره ما</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.buttonView}>
              <Text style={styles.button}>تنظیمات</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.logout()}>
            <View style={styles.buttonView}>
              <Text style={styles.button}>خروج</Text>
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
    navigation: state.navigation
  };
};

export default connect(mapStateToProps)(DrawerMenu);
