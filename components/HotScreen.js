import React, { Component } from "react";
import { Text, View, FlatList, TouchableWithoutFeedback } from "react-native";
import ActionButton from "react-native-action-button";

import Post from "../components/Post";
import {
  setIDState,
  setLocationState,
  setHotPostState,
  getMoreHotPost
} from "../functions/StateSetters";

import { styles } from "../styles/HomeScreenStyles";
import { headerStyles } from "../styles/HeaderStyles";

import { connect } from "react-redux";

import Icon from "react-native-vector-icons/Entypo";

class HotScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  componentDidMount = () => {
    setLocationState(this).then(() => {
      setHotPostState(this.props.accessToken, this.props.location, this);
    });
  };

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View style={headerStyles.headerBox}>
          <Text style={headerStyles.logo}>اوناگی</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.state.params.openDrawer()}
          >
            <Icon
              name="menu"
              size={50}
              color="#ffffff"
              style={{ margin: 10 }}
            />
          </TouchableWithoutFeedback>
        </View>
      )
    };
  };

  onEndHandler = () => {
    if (this.state.hasNext) {
      getMoreHotPost(
        this.props.accessToken,
        this.props.location,
        this,
        this.state.nextStr
      );
    }
  };
  onRefreshHandler = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        setHotPostState(
          this.props.accessToken,
          this.props.location,
          this
        ).then(() => {
          this.setState({
            refreshing: false
          });
        });
      }
    );
  };

  render() {
    if (
      !this.props.navigation.state.params ||
      !this.props.navigation.state.params.openDrawer
    ) {
      this.props.navigation.setParams({
        openDrawer: this.props.app.openDrawer
      });
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {!this.props || !this.props.hotPosts
            ? <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text>LOADING</Text>
              </View>
            : <FlatList
                data={this.props.hotPosts}
                keyExtractor={(item, index) => item._id}
                renderItem={({ item }) =>
                  <Post
                    likes={item.likes}
                    isLiked={item.isLiked}
                    content={item.content}
                    date={item.date}
                    postID={item._id}
                    username={item.username}
                    posterID={item.userID}
                    replies={item.replies}
                    navigation={this.props.navigation}
                  />}
                onEndReached={this.onEndHandler}
                onEndReachedThreshold={2}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefreshHandler}
              />}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    hotPosts: state.hotPosts,
    accessToken: state.userInfo.accessToken,
    location: state.location,
    pageName: state.pageName.current,
    pageNameNotFromDrawer: state.pageName.currentNotFromDrawer,
    refreshToken: state.userInfo.refreshToken,
    app: state.app
  };
};

export default connect(mapStateToProps)(HotScreen);
