
import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
} from 'react-native';
import ActionButton from 'react-native-action-button';

import { NavigationActions } from 'react-navigation';

import async from 'async';

import { Post } from '../components/Post';
import { setIDState, setLocationState, setPostState, getMorePost } from '../functions/StateSetters';

import { styles } from '../styles/HomeScreenStyles';
import { headerStyles } from '../styles/HeaderStyles';

import {connect} from 'react-redux';


class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.refreshing = false;
    this.state={
      Posts: []
    }

  }



  componentWillMount() {
    async.parallel([
      (callback) => {
        setIDState(this).then(() => callback()).catch(() => { });
      },
      (callback) => {
        setLocationState(this).then(() => callback()).catch(() => { });
      }
    ], (err) => {
      setPostState(this.state.userID, this.state.location, this).then(() => console.log("good")).catch(() => { });
    });

    console.log(this.props.dispatch({type: "LOG"}));

  }

  static navigationOptions = ({ navigation }) => {

    return {
      header: (
        <View style={headerStyles.headerBox} >
          <Text style={headerStyles.logo} >اوناگی</Text>
        </View>
      ),
    }
  };

  onPre = () => {
    const { navigate } = this.props.navigation;
    navigate('SendPostScreen');
  };

  onEndHandler = () => {
    console.log("end reached");
    getMorePost(this.state.userID, this.state.location, this, this.state.nextStr).then(() => console.log("more good")).catch(() => console.log("no more post"));
  };

  render() {
    if (!this.state || !this.state.Posts) {
      console.log("not ready");
      return null;
    } else {


      return (
        <View style={{ flex: 1 }}>


          <View style={styles.container}>
            <FlatList
              data={this.state.Posts}
              keyExtractor={(item, index) => item._id}
              renderItem={({ item }) => (
                <Post likes={item.likes} isLiked={item.isLiked} content={item.content} date={item.date} postID={item._id} userID={item.userID} HomeScreen={this} />
              )}
              onEndReached={this.onEndHandler}
              onEndReachedThreshold={3}
              refreshing={this.refreshing}
              onRefresh={() => {
                console.log("refreshing");
                this.refreshing = true;
                setTimeout(()=>{
                  this.refreshing = false;
                  console.log("done refreshing");
                }, 3000);
              }}
            />
            <ActionButton onPress={this.onPre} degrees={0} offsetX={10} offsetY={20} buttonColor='#858585' fixNativeFeedbackRadius={true} hideShadow={true} />
          </View>
        </View>
      );
    }
  }

}


export default connect()(HomeScreen);