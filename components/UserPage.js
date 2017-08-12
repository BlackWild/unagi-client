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
          <Text style={styles.username}>Username!</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    pageName: state.pageName
  };
};

export default connect(mapStateToProps)(UserPage);
