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

import Icon from "react-native-vector-icons/Entypo";
import { styles } from "../styles/formStyles";
import { sendUsernameId } from "../functions/StateSetters";
import { connect } from "react-redux";
import actions from "../reducers/Actions";
import { addBackHandler } from "../functions/BackHandlerAdder";

class SignUp extends Component {
  constructor(props) {
    super(props);
    addBackHandler(this);
    this.state = {
      username: "",
      password: "",
      repassword: "",
      passDisply: true,
      rePassDisply: true,
      accept: false
    };
    this.lock = false;
  }
  componentWillMount() {
    this.props.dispatch({ type: actions.SET_PAGE_NAME, pageName: "SignUp" });
  }

  clickedtime = () => {
    if (this.lock) {
      return null;
    } else {
      this.lock = true;
      if (this.state.password !== this.state.repassword) {
        ToastAndroid.show("رمز عبور تطابق ندارد", ToastAndroid.SHORT);
        this.lock = false;
      } else {
        try {
          if (!this.state.username || !this.state.password) throw "empty";
          if (!this.state.accept) throw "didn't accept rules";
          sendUsernameId(
            this.state.username,
            this.state.password,
            this
          ).then(arg => {
            if (!arg) {
              ToastAndroid.show("نام کاربری تکراری است", ToastAndroid.SHORT);
              this.lock = false;
            } else {
              this.props.navigation.navigate("Home");
              this.props.dispatch({
                type: actions.SET_PAGE_NAME,
                pageName: "Home"
              });
            }
          });
        } catch (err) {
          if (err === "empty")
            ToastAndroid.show(
              "نام کاربری یا رمز عبور نمی تواند خالی باشد",
              ToastAndroid.SHORT
            );
          else if (err === "didn't accept rules")
            ToastAndroid.show(
              "شما قوانین تیم 5 را نپذیرفتین!باید قبول کنید",
              ToastAndroid.SHORT
            );
          this.lock = false;
        }
      }
    }
  };

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  showPass = () => {
    this.setState({ passDisply: false });
  };
  hidePass = () => {
    this.setState({ passDisply: true });
  };
  showRePass = () => {
    this.setState({ rePassDisply: false });
  };
  hideRePass = () => {
    this.setState({ rePassDisply: true });
  };
  acceptLow = () => {
    if (!this.state.accept) this.setState({ accept: true });
    else this.setState({ accept: false });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#689F38" barStyle="light-content" />
        <View style={styles.headerBox}>
          <Text style={styles.title}>اوناگی</Text>
        </View>
        <ScrollView style={{ alignContent: "center" }}>
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
              <Image source={require("../img/logo.png")} style={styles.picUp} />
            </View>
            <View style={styles.textIn}>
              <Text style={styles.fieldName}>نام کاربری:</Text>
              <View style={styles.textAreaView}>
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
              <View style={styles.textAreaView}>
                <TextInput
                  secureTextEntry={this.state.passDisply}
                  underlineColorAndroid="transparent"
                  placeholder="Password"
                  style={styles.textarea}
                  onChangeText={password => this.setState({ password })}
                />
                <TouchableWithoutFeedback
                  onPressIn={this.showPass}
                  onPressOut={this.hidePass}
                >
                  <Icon
                    size={20}
                    name="eye"
                    color="#757575"
                    style={{ marginHorizontal: 10 }}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View style={styles.textIn}>
              <Text style={styles.fieldName}>تکرار رمز عبور:</Text>
              <View style={styles.textAreaView}>
                <TextInput
                  secureTextEntry={this.state.rePassDisply}
                  underlineColorAndroid="transparent"
                  placeholder="ReType Password"
                  style={styles.textarea}
                  onChangeText={repassword => this.setState({ repassword })}
                />
                <TouchableWithoutFeedback
                  onPressIn={this.showRePass}
                  onPressOut={this.hideRePass}
                >
                  <Icon
                    size={20}
                    name="eye"
                    color="#757575"
                    style={{ marginHorizontal: 10 }}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 30,
                margin: 5,
                alignItems: "center"
              }}
            >
              <TouchableWithoutFeedback onPress={this.acceptLow}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontFamily: "Vazir" }}>
                    قوانین تیم5 را می پذیرم.
                  </Text>

                  <View
                    style={
                      this.state.accept
                        ? [styles.checkBox, { backgroundColor: "#757575" }]
                        : styles.checkBox
                    }
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <TouchableWithoutFeedback onPress={this.clickedtime}>
              <View style={[styles.button, { marginBottom: 5, marginTop: 5 }]}>
                <Text
                  style={[
                    styles.buttonText,
                    { textAlign: "center", fontFamily: "Vazir" }
                  ]}
                >
                  ساخت حساب کاربری
                </Text>
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
export default connect(mapStateToProps)(SignUp);
