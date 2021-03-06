import React, { Component } from "react";
import { Text, View, TouchableWithoutFeedback, Image } from "react-native";

import { headerStyles } from "../styles/HeaderStyles";
import { styles } from "../styles/AboutUsStyle";
import { connect } from "react-redux";
import actions from "../reducers/Actions";
import { addBackHandler } from "../functions/BackHandlerAdder";
import Icon from "react-native-vector-icons/Entypo";

class AboutUsPage extends Component {
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
        <View style={headerStyles.pagesHeader}>
          <TouchableWithoutFeedback onPress={this.backTouchHandler}>
            <Icon
              name="chevron-left"
              size={30}
              color="#f1f1f1"
              style={{ padding: 10 }}
            />
          </TouchableWithoutFeedback>
          <Text style={headerStyles.titleHeader}> درباره ما</Text>
        </View>
        <View
          style={{
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            flex: 1
          }}
        >
          <Text style={styles.team5}>تیم5</Text>
          <Text style={{ color: "#0077c0", fontSize: 20 }}>
            شروع از صفر سخته ولی میشه
          </Text>
          <View style={{ margin: 20 }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.text1}>درباره ما همین پس که خیلی خفنیم</Text>
              <Text style={[styles.text1, { textAlign: "left" }]}>
                => مثل تیم5 بشیم/باشید
              </Text>
            </View>
            <View style={styles.center}>
              <Text style={styles.text1}>علیرضا، کامیار، علی</Text>
              <Text style={[styles.text2]}>Back End</Text>
            </View>
            <View style={styles.center}>
              <Text style={styles.text1}>سیاوش، مهدی، فاطمه</Text>
              <Text style={[styles.text2]}>Front End</Text>
            </View>
            <View style={styles.center}>
              <Text style={styles.text1}>team5@gmail.com</Text>
              <Text style={[styles.text2]}>ارتباط با ما</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    pageName: state.pageName.current,
    pageNameNotFromDrawer: state.pageName.currentNotFromDrawer,
    app: state.app
  };
};

export default connect(mapStateToProps)(AboutUsPage);
