import React, { Component } from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import { styles } from "../styles/DrawerMenuStyles";
import Icon from "react-native-vector-icons/Entypo";
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
              <Icon
                name="user"
                size={20}
                color="#689F38"
                style={{ margin: 10, marginRight: 0 }}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.navig("AboutUsPage")}>
            <View style={styles.buttonView}>
              <Text style={styles.button}>درباره ما</Text>
              <Icon
                name="help"
                size={20}
                color="#689F38"
                style={{ margin: 10, marginRight: 0 }}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.buttonView}>
              <Text style={styles.button}>تنظیمات</Text>
              <Icon
                name="cog"
                size={20}
                color="#689F38"
                style={{ margin: 10, marginRight: 0 }}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.logout()}>
            <View style={styles.buttonView}>
              <Text style={styles.button}>خروج</Text>
              <Icon
                name="log-out"
                size={20}
                color="#689F38"
                style={{ margin: 10, marginRight: 0 }}
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
    navigation: state.navigation
  };
};

export default connect(mapStateToProps)(DrawerMenu);
