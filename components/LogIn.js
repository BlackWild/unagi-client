import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
  ToastAndroid
} from "react-native";
// import { styles } from '../styles/LogInStyles';
import { styles } from "../styles/formStyles";

import { connect } from "react-redux";
import actions from "../reducers/Actions";
import { logIn } from "../functions/StateSetters";

import { addBackHandler } from "../functions/BackHandlerAdder";

export class LogIn extends Component {
  constructor(props) {
    super(props);
    addBackHandler(this);
    this.state = {
      passDisply: true
    };
  }

  componentWillMount() {
    this.props.dispatch({ type: actions.SET_PAGE_NAME, pageName: "LogIn" });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  logInClickHandler = () => {
    try {
      if (this.state.username === "" || this.state.password === "")
        throw "empty";
      logIn(this.state.username, this.state.password, this)
        .then(arg => {
          // console.warn("hellow");

          if (!arg) {
            ToastAndroid.show(
              "نام کاربری یا رمز عبور نادرست است",
              ToastAndroid.SHORT
            );
          } else {
            this.props.navigation.navigate("Home");
            this.props.dispatch({
              type: actions.SET_PAGE_NAME,
              pageName: "Home"
            });
            //
          }
        })
        .catch(() => {});
    } catch (err) {
      ToastAndroid.show(
        "نام کاربری یا رمز عبور نمی تواند خالی باشد",
        ToastAndroid.SHORT
      );
    }
  };
  signUpClickHandler = () => {
    this.props.navigation.navigate("SignUp");
    this.props.dispatch({ type: actions.SET_PAGE_NAME, pageName: "SignUp" });
  };

  showPass = () => {
    this.setState({ passDisply: false });
  };
  hidePass = () => {
    this.setState({ passDisply: true });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#689F38" barStyle="light-content" />
        <View style={styles.headerBox}>
          <Text
            style={{
              fontSize: 30,
              color: "#FFFFFF",
              textAlign: "left",
              fontFamily: "Vazir",
              marginLeft: 13
            }}
          >
            اوناگی
          </Text>
        </View>
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center"
            }}
          >
            <View>
              <Image source={require("../img/logo.png")} style={styles.picIn} />
            </View>
            <View style={styles.textIn}>
              <Text style={styles.fieldName}>نام کاربری:</Text>
              <View
                style={[
                  { flexDirection: "row", alignItems: "center" },
                  styles.textAreaView
                ]}
              >
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Username"
                  style={styles.textarea}
                  onChangeText={username => this.setState({ username })}
                />
              </View>
            </View>
            <View style={styles.textIn}>
              <Text style={styles.fieldName}>رمز عبور:</Text>
              <View
                style={[
                  { flexDirection: "row", alignItems: "center" },
                  styles.textAreaView
                ]}
              >
                <TextInput
                  secureTextEntry={this.state.passDisply}
                  underlineColorAndroid="transparent"
                  placeholder="Password"
                  style={[styles.textarea]}
                  onChangeText={password => this.setState({ password })}
                />
                <TouchableWithoutFeedback
                  onPressIn={this.showPass}
                  onPressOut={this.hidePass}
                >
                  <Image
                    source={require("../img/eye.png")}
                    style={{ height: 25, width: 25, marginHorizontal: 5 }}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
            <TouchableWithoutFeedback onPress={this.logInClickHandler}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>ورود به حساب کاربری</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.signUpClickHandler}>
              <View style={styles.button}>
                <Text style={styles.buttonText}> حساب کاربری ندارم </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    pageName: state.pageName.current,
    pageNameNotFromDrawer: state.pageName.currentNotFromDrawer
  };
};
export default connect(mapStateToProps)(LogIn);
