
import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import ActionButton from 'react-native-action-button';

import async from 'async';

import Post from '../components/Post';
import {setIDState, setLocationState, setPostState, getMorePost, tokenProvider} from '../functions/StateSetters';

import { styles } from '../styles/HomeScreenStyles';
import { headerStyles } from '../styles/HeaderStyles';

import { connect } from 'react-redux';
import actions from '../reducers/Actions'
import {addBackHandler} from '../functions/BackHandlerAdder';

import Icon from 'react-native-vector-icons/Entypo';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    addBackHandler(this);


    this.state = {
      refreshing: false,
    }
  }

  componentWillMount = () => {
    this.props.navigation.setParams({
      openDrawer: this.props.app.openDrawer,
    });
  }

  componentWillMount() {
    setLocationState(this).then(() => {
      setPostState(this.props.accessToken, this.props.location, this);
    });
  }

  static navigationOptions = ({ navigation }) => ({
    header: (
      <View style={headerStyles.headerBox} >
        <Text style={headerStyles.logo} >اوناگی</Text>
        <TouchableWithoutFeedback onPress={()=> navigation.state.params.openDrawer()}>
          <Icon name="menu" size={50}/>
        </TouchableWithoutFeedback>
      </View>
    ),
  });

  onPre = () => {
    this.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "SendPostScreen"});
    this.props.navigation.navigate("SendPostScreen");
  }

  onEndHandler = () => {
    if(this.state.hasNext) {
      getMorePost(this.props.accessToken, this.props.location, this, this.state.nextStr);
    }
  };
  onRefreshHandler = () => {
    this.setState({
      refreshing: true,
    }, () => {
        setPostState(this.props.accessToken, this.props.location, this).then(() => {
            this.setState({
              refreshing: false,
           })
        }).catch(() => { })
    });
  }

  render() {
    return (
        <View style={{ flex: 1 }}>

          <View style={styles.container}>
            {!this.props || !this.props.posts ?
              (<View style={{ flex: 1, justifyContent: 'center' }}><Text>LODING</Text></View>) :
              (
                <FlatList
                  data={this.props.posts}
                  keyExtractor={(item, index) => item._id}
                  renderItem={({ item }) => (
                    <Post
                      likes={item.likes}
                      isLiked={item.isLiked}
                      content={item.content}
                      date={item.date}
                      postID={item._id}
                      username={item.username}
                      posterID={item.userID}
                      navigation={this.props.navigation} />
                  )}
                  onEndReached={this.onEndHandler}
                  onEndReachedThreshold={2}
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefreshHandler}
                />
              )
            }

            <ActionButton onPress={this.onPre} degrees={0} offsetX={10} offsetY={20} buttonColor='#858585' fixNativeFeedbackRadius={true} hideShadow={true} />
          </View>
        </View>
    );

  }

}


const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    accessToken: state.userInfo.accessToken,
    location: state.location,
    pageName: state.pageName,
    refreshToken: state.userInfo.refreshToken,
    app: state.app,
  }
};

export default connect(mapStateToProps)(HomeScreen);