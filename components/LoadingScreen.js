import React, { Component } from "react";
import { Text, View, StatusBar, Image, ActivityIndicator } from "react-native";

import { styles } from "../styles/LoadingScreenStyles";

import { connect } from "react-redux";
import actions from "../reducers/Actions";
import { addBackHandler } from "../functions/BackHandlerAdder";

import { tokenProvider } from "../functions/StateSetters";

class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    addBackHandler(this);
  }

  componentWillMount() {
    this.props.dispatch({
      type: actions.SET_PAGE_NAME,
      pageName: "LoadingScreen"
    });
    this.props.dispatch({
      type: actions.SET_NAV_REF,
      nav: this.props.navigation
    });
  }

  componentDidMount() {
    if (this.props.refreshToken) {
      tokenProvider(this)
        .then(() => {
          this.props.navigation.navigate("Home");
        })
        .catch(() => {
          this.props.navigation.navigate("LogIn");
        });
    } else {
      this.props.navigation.navigate("LogIn");
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#0091ea" }}>
        <View style={[styles.container]}>
          <Image source={require("../img/logo.png")} style={styles.pic} />
          <Text style={styles.welcome}>اونجا که هستی چه خبره!؟</Text>
          <ActivityIndicator
            style={{ transform: [{ scale: 1.5 }] }}
            size="large"
            color="#DCEDC8"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    pageName: state.pageName.current,
    pageNameNotFromDrawer: state.pageName.currentNotFromDrawer,
    refreshToken: state.userInfo.refreshToken
  };
};

export default connect(mapStateToProps)(LoadingScreen);
