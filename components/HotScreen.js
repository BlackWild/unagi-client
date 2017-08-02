
import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
} from 'react-native';
import ActionButton from 'react-native-action-button';

import { NavigationActions } from 'react-navigation';

import async from 'async';

import Post from '../components/Post';
import { setIDState, setLocationState, setHotPostState, getMoreHotPost } from '../functions/StateSetters';

import { styles } from '../styles/HomeScreenStyles';
import { headerStyles } from '../styles/HeaderStyles';

import { connect } from 'react-redux';


class HotScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    }
  }

  componentWillMount() {
    async.parallel([
      (callback) => {
        if (this.props.userID) callback();
        setIDState(this).then(() => callback()).catch(() => { });
      },
      (callback) => {
        setLocationState(this).then(() => callback()).catch(() => { });
      }
    ], (err) => {
      setHotPostState(this.props.userID, this.props.location, this).then(() => console.log("good")).catch(() => { });
    });
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
    getMoreHotPost(this.props.userID, this.props.location, this, this.state.nextStr).then(() => console.log("more good")).catch(() => console.log("no more post"));
  };
  onRefreshHandler = () => {
    console.log("refreshing");
    this.setState({
      refreshing: true,
    }, () => {
      setHotPostState(this.props.userID, this.props.location, this).then(() => {
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
          {!this.props || !this.props.hotPosts ?
            (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>LOADING</Text></View>) :
            (
              <FlatList
                data={this.props.hotPosts}
                keyExtractor={(item, index) => item._id}
                renderItem={({ item }) => (
                  <Post likes={item.likes} isLiked={item.isLiked} content={item.content} date={item.date} postID={item._id} userID={item.userID} />
                )}
                onEndReached={this.onEndHandler}
                onEndReachedThreshold={2}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefreshHandler}
              />
            )
          }
        </View>
      </View>
    );

  }

}


const mapStateToProps = (state) => {
  return {
    hotPosts: state.hotPosts,
    userID: state.userID,
    location: state.location,
  }
}

export default connect(mapStateToProps)(HotScreen);