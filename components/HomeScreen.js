
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Button,
  Image,
} from 'react-native';
import ActionButton from 'react-native-action-button';

import { NavigationActions  } from 'react-navigation';

import async from 'async';

import {Post} from '../components/Post';
import {setIDState, setLocationState, setPostState} from '../functions/StateSetters';

import {styles} from '../styles/HomeScreenStyles';
import {headerStyles} from '../styles/HeaderStyles'


export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    // getIDState.bind(this);
  }
  
  componentWillMount() {
    async.parallel([
      (callback) => {
        setIDState(this).then( () => callback()).catch( () => {} );
      },
      (callback) => {
        setLocationState(this).then( () => callback()).catch( () => {} );
      }
    ], (err) => {
      setPostState(this.state.userID, this.state.location, this).then( () => console.log("good")).catch( () => {} );
    });

  }

  static navigationOptions = ({ navigation }) => {

    return {
      header: null,
    }
  };

  render() {
    if (!this.state || !this.state.Posts) {
      console.log("not ready");
      return null;
    } else {
      const { navigate } = this.props.navigation;

      onPre = ()=>{
        navigate('SendPostScreen');
      };

      return (
        <View style={{ flex: 1 }}>
          <View style={headerStyles.headerBox} >
            <Text style={headerStyles.logo} >اونگی</Text>
          </View>
          <View style={styles.container}>
            <ScrollView>
              {this.state.Posts.map((post) => (<Post key={this.state.Posts.indexOf(post)} content={post.content} />))}
            </ScrollView>
            <ActionButton onPress={onPre} degrees={0} offsetX={10} offsetY={20} buttonColor="rgba(231,76,60,1)" fixNativeFeedbackRadius={true} hideShadow={true} />
          </View>
        </View>
      );
    }
  }

}